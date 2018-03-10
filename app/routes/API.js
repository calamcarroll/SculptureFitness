var User                   = require('../models/user');
var Gym                    = require('../models/gyms');
var jwt                    = require('jsonwebtoken');
var secret                 = 'mySecret';
var bcrypt                 = require('bcrypt-nodejs');
module.exports = function(router){

    //Route for adding a new gym
    router.post('/gym', function(req,res){
        var gym = new Gym();
        gym.name = req.body.name;
        gym.monthlyPrice = req.body.monthlyPrice;
        gym.threeMonthPrice = req.body.threeMonthPrice;
        gym.yearPrice = req.body.yearPrice;
        gym.email = req.body.email;
        gym.website = req.body.website;
        gym.location.longitude = req.body.longitude;
        gym.location.latitude = req.body.latitude;
        gym.save(function (err) {
            if(err){
                res.send(err)
            }else{
                res.json("Gym has been added to the database");
            }
        })

    });
    //Route for retrieving all gyms in database
    router.get('/getGyms', function (req, res) {
       Gym.find(function(err, gym){
          if(err){
              res.send("There has been an error with this gym request: " +gym);
          } else{
              res.json(gym);
          }
       });
    });
    router.put('/updateProfileInfo/:id', function(req,res){
        User.findById(req.params.id,function (err, user) {
            if(err){
                res.send('There has been as error: ' + err )
            }else{
                user.username = req.body.username;
                user.password = req.body.password;
                user.email = req.body.email;
                user.weight = req.body.weight;
                user.height = req.body.height;
                user.bodyFat = req.body.bodyFat;
                bcrypt.hash(user.password, null, null, function(err,hash) {
                    if (err) return next(err);
                    user.password = hash;
                    user.save(function (err) {
                        if(err){
                            res.send("User could not be saved: " + err);
                        }else{
                            res.send("User has been successfully updated");
                        }
                    })
                });
            }
        })
    });

    //User registration route
    router.post('/users', function (req, res) {
        var user = new User();
            user.username      = req.body.username;
            user.password      = req.body.password;
            user.email         = req.body.email;
            user.isPersonalTrainer = req.body.isPersonalTrainer;

        if(req.body.username == null || req.body.username === '' ||
            req.body.password == null || req.body.password ===''||
            req.body.email == null || req.body.email === ''){

            res.json({success: false, message: '\'Please provide all required fields\''})
        }else{

            bcrypt.hash(user.password, null, null, function(err,hash){
                if(err)return next(err);
                user.password = hash;
                user.save(function(err){
                    if(err){

                        res.json({success: false, message: '\'User already exists with this username or email\''})
                    }else{

                        res.json({success:true, message:'User created!'})
                    }
                });
            });


        }
     });
    //Gets all the information on the current user logged in
    router.get('/getUserInfo/:id', function(req,res){
        User.findById(req.params.id, function(err,data){
            if(data){
                res.json(data)
            }else{
                res.json(err);
            }
        })
    });

    //user login routes
    router.post('/authenticate', function(req,res){
        User.findOne({username:req.body.username}).select('email username password isPersonalTrainer _id').exec(function(err,user){
            if(err) throw err;
                if(!user){
                    res.json({success:false, message:'No such user found!'});
                }else if (user){
                    if (req.body.password) {
                        var validatePassword = user.comparePassword(req.body.password);
                        if (!validatePassword) {
                            res.json({success : false, message : 'Password incorrect'});
                        }else{
                            var token = jwt.sign({username: user.username, email: user.email, isPersonalTrainer: user.isPersonalTrainer, userId: user._id}, secret, {expiresIn: '24h'});
                            res.json({success : true, message : 'User logged in', token: token});
                        }
                    }else{
                        res.json({success : false, message : 'No password provided!'});
                    }﻿
                  }
               })
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
    /// Must be placed at the bottom so that the token can be assigned to the headers when it gets decrypted. If not it wont get assigned
    router.post('/currentUser', function(req, res){
        res.send(req.decoded);
    });
    return router;
};
