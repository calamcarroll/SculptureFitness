var User                   = require('../models/user');
var Gym                    = require('../models/gyms');
var Program                = require('../models/programs');
var jwt                    = require('jsonwebtoken');
var secret                 = 'mySecret';
var bcrypt                 = require('bcrypt-nodejs');
module.exports = function(router){
    //Route for showing all personal trainers
    router.get('/getPersonalTrainers', function(req,res){
       User.find({"isPersonalTrainer": true}, function(err,user){
           if(err){
               res.send(err);
           }else{
               res.json(user);
           }
       })
    });
    //Route for adding programs
    router.post('/programs', function (req,res) {
        var program = new Program();
        //Initial Information about the program
        program.name = req.body.name;
        program.createdFor= req.body.createdFor;
        program.createdBy = req.body.createdBy;
        program.date = Date.now();

       ///day 1 data
        program.day1.muscleGroup1 = req.body.day1MuscleGroup1;
        program.day1.exercise1 = req.body.day1Exercise1;
        program.day1.sets1 = req.body.day1Sets1;
        program.day1.reps1 = req.body.day1Reps1;
        program.day1.restTime1 = req.body.day1RestTime1;

        program.day1.muscleGroup2 = req.body.day1MuscleGroup2;
        program.day1.exercise2 = req.body.day1Exercise2;
        program.day1.sets2 = req.body.day1Sets2;
        program.day1.reps2 = req.body.day1Reps2;
        program.day1.restTime2 = req.body.day1RestTime2;

        program.day1.muscleGroup3 = req.body.day1MuscleGroup3;
        program.day1.exercise3 = req.body.day1Exercise3;
        program.day1.sets3 = req.body.day1Sets3;
        program.day1.reps3 = req.body.day1Reps3;
        program.day1.restTime3 = req.body.day1RestTime3;

        program.day1.muscleGroup4 = req.body.day1MuscleGroup4;
        program.day1.exercise4 = req.body.day1Exercise4;
        program.day1.sets4 = req.body.day1Sets4;
        program.day1.reps4 = req.body.day1Reps4;
        program.day1.restTime4 = req.body.day1RestTime4;

        ///Day 2 data
        program.day2.muscleGroup1 = req.body.day2MuscleGroup1;
        program.day2.exercise1 = req.body.day2Exercise1;
        program.day2.sets1 = req.body.day2Sets1;
        program.day2.reps1 = req.body.day2Reps1;
        program.day2.restTime1 = req.body.day2RestTime1;

        program.day2.muscleGroup2 = req.body.day2MuscleGroup2;
        program.day2.exercise2 = req.body.day2Exercise2;
        program.day2.sets2 = req.body.day2Sets2;
        program.day2.reps2 = req.body.day2Reps2;
        program.day2.restTime2 = req.body.day2RestTime2;

        program.day2.muscleGroup3 = req.body.day2MuscleGroup3;
        program.day2.exercise3 = req.body.day2Exercise3;
        program.day2.sets3 = req.body.day2Sets3;
        program.day2.reps3 = req.body.day2Reps3;
        program.day2.restTime3 = req.body.day2RestTime3;

        program.day2.muscleGroup4 = req.body.day1MuscleGroup4;
        program.day2.exercise4 = req.body.day1Exercise4;
        program.day2.sets4 = req.body.day1Sets4;
        program.day2.reps4 = req.body.day1Reps4;
        program.day2.restTime4 = req.body.day2RestTime4;

        //day 3 data
        program.day3.muscleGroup1 = req.body.day3MuscleGroup1;
        program.day3.exercise1 = req.body.day3Exercise1;
        program.day3.sets1 = req.body.day3Sets1;
        program.day3.reps1 = req.body.day3Reps1;
        program.day3.restTime1 = req.body.day3RestTime1;

        program.day3.muscleGroup2 = req.body.day3MuscleGroup2;
        program.day3.exercise2 = req.body.day3Exercise2;
        program.day3.sets2 = req.body.day3Sets2;
        program.day3.reps2 = req.body.day3Reps2;
        program.day3.restTime2 = req.body.day3RestTime2;

        program.day3.muscleGroup3 = req.body.day3MuscleGroup3;
        program.day3.exercise3 = req.body.day3Exercise3;
        program.day3.sets3 = req.body.day3Sets3;
        program.day3.reps3 = req.body.day3Reps3;
        program.day3.restTime3 = req.body.day3RestTime3;

        program.day3.muscleGroup4 = req.body.day3MuscleGroup4;
        program.day3.exercise4 = req.body.day3Exercise4;
        program.day3.sets4 = req.body.day3Sets4;
        program.day3.reps4 = req.body.day3Reps4;
        program.day3.restTime4 = req.body.day3RestTime4;

        //day 4 data
        program.day4.muscleGroup1 = req.body.day4MuscleGroup1;
        program.day4.exercise1 = req.body.day4Exercise1;
        program.day4.sets1 = req.body.day4Sets1;
        program.day4.reps1 = req.body.day4Reps1;
        program.day4.restTime1 = req.body.day4RestTime1;

        program.day4.muscleGroup2 = req.body.day4MuscleGroup2;
        program.day4.exercise2 = req.body.day4Exercise2;
        program.day4.sets2 = req.body.day4Sets2;
        program.day4.reps2 = req.body.day4Reps2;
        program.day4.restTime2 = req.body.day4RestTime2;

        program.day4.muscleGroup3 = req.body.day4MuscleGroup3;
        program.day4.exercise3 = req.body.day4Exercise3;
        program.day4.sets3 = req.body.day4Sets3;
        program.day4.reps3 = req.body.day4Reps3;
        program.day4.restTime3 = req.body.day4RestTime3;

        program.day4.muscleGroup4 = req.body.day4MuscleGroup4;
        program.day4.exercise4 = req.body.day4Exercise4;
        program.day4.sets4 = req.body.day4Sets4;
        program.day4.reps4 = req.body.day4Reps4;
        program.day4.restTime4 = req.body.day4RestTime4;

        program.save(function(err){
            if(err){
                res.send(err)
            }else{
                res.json("Program has been created!");
            }
        })
    });
    //Route for getting programs only created
    router.get('/getPrograms/:createdFor', function(req,res){
        Program.find({"createdFor":req.params.createdFor},function (err, program) {
            if(err){
                res.send(err)
            }else{
                res.json(program)
            }
        })
    });
    //Route for getting a program by name and id of createdBy
    router.get('/getProgramsById/:id', function(req,res){
        Program.find({ '_id' : req.params.id },function (err, program) {
            if(err){
                res.send(err)
            }else{
                res.json(program)
            }
        })
    });
    //route for updating a program by day
    router.put('/updateProgram/:id', function(req,res){
        Program.findById(req.params.id,function (err, program) {
            if(err){
                res.send('There has been as error: ' + err )
            }else{


                program.date = Date.now();
                program.day1.muscleGroup = req.body.muscleGroup1;
                program.day1.exercise = req.body.exercise1;
                program.day1.sets = req.body.sets1;
                program.day1.reps = req.body.reps1;
                program.day1.restTime = req.body.restTime1;

                program.day2.muscleGroup = req.body.muscleGroup2;
                program.day2.exercise = req.body.exercise2;
                program.day2.sets = req.body.sets2;
                program.day2.reps = req.body.reps2;
                program.day2.restTime = req.body.restTime2;

                program.day3.muscleGroup = req.body.muscleGroup3;
                program.day3.exercise = req.body.exercise3;
                program.day3.sets = req.body.sets3;
                program.day3.reps = req.body.reps3;
                program.day3.restTime = req.body.restTime3;

                program.day4.muscleGroup = req.body.muscleGroup4;
                program.day4.exercise = req.body.exercise4;
                program.day4.sets = req.body.sets4;
                program.day4.reps = req.body.reps4;
                program.day4.restTime = req.body.restTime4;


                program.save(function (err) {
                        if(err){
                            res.send("Program has not been updated " + err);
                        }else{
                            res.send("Program updated! ");
                        }
                    });

            }
        })
    });
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
    //Route for updating a users password
    router.put('/updateProfilePassword/:id', function(req,res){
        User.findById(req.params.id,function (err, user) {
            if(err){
                res.send('There has been as error: ' + err )
            }else{
                user.password = req.body.password;
                bcrypt.hash(user.password, null, null, function(err,hash){
                    if(err)return next(err);
                    user.password = hash;
                user.save(function (err) {
                    if(err){
                        res.send("Password update failed: " + err);
                    }else{
                        res.send("User password been successfully updated");
                      }
                   });
                });
            }
        })
    });
    //Route for updating a users profile info
    router.put('/updateProfileInfo/:id', function(req,res){
        User.findById(req.params.id,function (err, user) {
            if(err){
                res.send('There has been as error: ' + err )
            }else{

                user.username = req.body.username;
                user.email    = req.body.email;
                user.weight   = req.body.weight;
                user.height   = req.body.height;
                user.bodyFat  = req.body.bodyFat;
                    user.save(function (err) {
                        if(err){
                            res.send("User could not be saved: " + err);
                        }else{
                            res.send("User has been successfully updated");
                        }
                    })

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
        User.findOne({username:req.body.username}).select('email username password isPersonalTrainer _id isAdmin').exec(function(err,user){
            if(err) throw err;
                if(!user){
                    res.json({success:false, message:'No such user found!'});
                }else if (user){
                    if (req.body.password) {
                        var validatePassword = user.comparePassword(req.body.password);
                        if (!validatePassword) {
                            res.json({success : false, message : 'Password incorrect'});
                        }else{
                            var token = jwt.sign({username: user.username, email: user.email, isPersonalTrainer: user.isPersonalTrainer, userId: user._id, isAdmin: user.isAdmin}, secret, {expiresIn: '24h'});
                            res.json({
                                success : true,token:token
                                /// You have to res the token here. You can return the user id if you want but make sure to include the token
                            });
                        }
                    }else{
                        res.json({success : false, message : 'No password provided!'});
                    }﻿
                  }
               })
             });
    //Middleware used for decrypting token
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
               })}else{
               res.json({success:false, message:'token not found'})
           }
    });
    /// Must be placed at the bottom so that the token can be assigned to the headers when it gets decrypted. If not it wont get assigned
    router.post('/currentUser', function(req, res){
        res.send(req.decoded);
    });
    return router;
};
