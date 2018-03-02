var User                   = require('../models/user');
var jwt                    = require('jsonwebtoken');
var secret                 = 'mySecret';
module.exports = function(router){
    //User registration route
    router.post('/users', function (req, res) {

        var user = new User();
            user.username      = req.body.username;
            user.password      = req.body.password;
            user.email         = req.body.email;

        if(req.body.username == null || req.body.username == ''|| req.body.password == null || req.body.password ==''| req.body.email == null || req.body.email == ''){

            res.json({success: false, message: '\'Please provide all required fields\''})
        }else{
            user.save(function(err){
                if(err){

                    res.json({success: false, message: '\'User already exists with this username or email\''})
                }else{

                    res.json({success:true, message:'User created!'})
                }
            });
        }
     });

    //user login routes
    router.post('/authenticate', function(req,res){

        User.findOne({username:req.body.username}).select('email username password').exec(function(err,user){
            if(err) throw err;
                if(!user){
                    res.json({success:false, message:'No such user found!'});
                }else if (user){
                    if (req.body.password) {
                        var validatePassword = user.comparePassword(req.body.password);
                        if (!validatePassword) {
                            res.json({success : false, message : 'Password incorrect'});
                        }
                        else{
                            var token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '24h'});
                            res.json({success : true, message : 'User logged in', token: token});
                        }
                    }
                    else{
                        res.json({success : false, message : 'No password provided!'});
                    }﻿
                  }
               })
             });
    router.post('/currentUser', function(req, res){
        res.send(req.decoded);
    });

    router.use(function(req,res,next){
       var token = req.body.token||req.body.query||req.headers['x-access-token'];
           if(token){
               //verify the token
               jwt.verify(token,'mySecret',function(err,decoded){
                   if(err){
                       res.json({success:false, message: 'Token was not verified'})
                   }else{
                       req.decoded = decoded;
                       next();
                   }
               })
           }else{
               res.json({success:false, message:'token not found'})
           }
         });
    return router;
};
