var User                   = require('../models/user');
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
                res.json({success:false, message:'No such user found!'})
            }else if (user){
                if (req.body.password) {
                    var validatePassword = user.comparePassword(req.body.password);
                    if (!validatePassword) {
                        res.json({success : false, message : 'Password incorrect'});
                    }
                    else{
                        res.json({success : true, message : 'User logged in'});
                    }
                }
                else{
                    res.json({success : false, message : 'No password provided!'});
                }﻿
            }

        })
    });

    return router;
};
