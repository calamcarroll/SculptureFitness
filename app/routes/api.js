var User                   = require('../models/user');
var Gym                    = require('../models/gyms');
var Program                = require('../models/programs');
var Sessions                = require('../models/sessions');
var jwt                    = require('jsonwebtoken');
var secret                 = 'mySecret';
var bcrypt                 = require('bcrypt-nodejs');
var fs                     = require("fs");
var readFileSync           = require("fs").readFileSync;

module.exports = function(router){
    router.get('/personalTrainersPrograms/:createdBy', function(req,res){
        Program.find({"createdBy":req.params.createdBy}, function(err, programs){
            if(err){
                res.send("There has been an error retrieving these programs! " + err)
            }else{
                res.json(programs)
            }
        })
    });
    router.get('/programById/:id', function(req,res){
        Program.findById(req.params.id, function (err,program) {
            if(!program){
                res.send("There has been an error: " + err);
            }else{
                res.json(program.day1);
            }
        })
    });
    router.get('/programDay', function(req,res){
       Program.find(function(err,program){
           if(!program){
               res.send("There has been an error here!")
           }else{
               res.json(program)
           }
       })
    });
    router.get("/getAllPrograms", function(req,res){
        Program.find(function(err, program){
            if(!program ){
                res.send("There has been an error retrieving this program" + err)
            }else{
                res.json(program)
            }
        });
    });
    router.delete('/deleteProgram/:id', function(req,res){
        Program.findByIdAndRemove(req.params.id, function(err, program){
                    if(!program){
                        res.send("Program could not be deleted! "+ err);
                    }else{
                        res.json("This program is now deleted: "+program);
                    }
        })
    });
    router.delete('/deleteUser/:id', function(req,res){
        User.findByIdAndRemove(req.params.id,function(user){
            if(user){
                res.send("User has been succesfully deleted");
            }else{
                res.send("User could not be deleted!");
            }
        })
    });
    router.get('/getAllUserInfo', function(req,res){
        User.find(function(err, user){
            if(err){
                res.send(err)
            }else{
                res.json(user)
            }
        })
    });
    //Route for getting all client Info
    router.get('/getClientInfo/:id', function (req,res) {
       User.findById(req.params.id, function (err, data) {
           if(data){
               res.json(data)
           }else{
               res.json(err)
           }
       })
    });
    router.get('/getSingleGym/:id', function(req,res){
       Gym.findById(req.params.id, function(err,data){
           if(err){
               res.send(err)
           }else{
               res.json(data);
           }
       })
    });
    router.put('/updateGym/:id', function(req,res){
       Gym.findById(req.params.id, function(err,gym){
           if(err){
               res.send("There has been an error")
           }else{
               gym.name = req.body.name;
               gym.email = req.body.email;
               gym.webiste = req.body.website;
               gym.profileImg = req.body.profileImg;
               gym.yearPrice = req.body.yearPrice;
               gym.threeMonthPrice = req.body.threeMonthPrice;
               gym.monthlyPrice = req.body.monthlyPrice;
               gym.location.longitude = req.body.longitude;
               gym.location.latitude = req.body.longitude;
               gym.save(function(err){
                   if(err){
                       res.send(err)
                   }else{
                       res.send("Gym has been successfully updated! ")
                   }
               })
           }
       })
    });
    //Route for removing a client1 linked with a personal trainer
    router.put('/removeClient1/:id', function(req, res){
       User.findById(req.params.id, function(err, data){
           if(data){
              data.client1= {};
              data.save(function (err) {
                  if(err){
                      res.send("There has been an error un-linking you!");
                  }else{
                      res.send("You have now been un-linked with this client");
                  }
              })
           }else{
               res.send("There has been an error")
           }
       })
    });
    //Route for removing client2 linked with the personal trainer
    router.put('/removeClient2/:id', function(req, res){
        User.findById(req.params.id, function(err, data){
            if(data){
                data.client2= {};
                data.save(function (err) {
                    if(err){
                        res.send("There has been an error un-linking you!");
                    }else{
                        res.send("You have now been un-linked with this client");
                    }
                })
            }else{
                res.send("There has been an error")
            }
        })
    });
    //Route for removing client3 linked with the personal trainer
    router.put('/removeClient3/:id', function(req, res){
        User.findById(req.params.id, function(err, data){
            if(data){
                data.client3= {};
                data.save(function (err) {
                    if(err){
                        res.send("There has been an error un-linking you!");
                    }else{
                        res.send("You have now been un-linked with this client");
                    }
                })
            }else{
                res.send("There has been an error")
            }
        })
    });
    //Route for removing client4 linked with the personal trainer
    router.put('/removeClient4/:id', function(req, res){
        User.findById(req.params.id, function(err, data){
            if(data){
                data.client4= {};
                data.save(function (err) {
                    if(err){
                        res.send("There has been an error un-linking you!");
                    }else{
                        res.send("You have now been un-linked with this client");
                    }
                })
            }else{
                res.send("There has been an error")
            }
        })
    });
    //Route for getting all session information for a specific user
    router.get('/getSingleUserSessions/:userId', function(req,res){
        Sessions.find({userId: req.params.userId}, function(err, session){
            if(err){
                res.send(err)
            }else{
                res.json(session)
            }
        })
    });
    //Route for getting all personal trainer requests
    router.get('/personalTrainerRequests', function(req, res){
       User.find({"isPersonalTrainerTemp":true}, function(err,requests){
          if(err){
              res.json(err)
          }else{
              res.json(requests)
          }
       });
    });
    router.put('/makeTrainer/:id', function(req,res){
        User.findById(req.params.id, function(err,requests){
            if(err){
                res.json(err)
            }else{
                requests.isPersonalTrainerTemp = false;
                requests.isPersonalTrainer = true;
                requests.save(function(err, data){
                    if(err){
                        res.send(err)
                    }else{
                        res.json(data)
                    }
                })
            }
        });
    });
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
    router.post('/addSession', function(req,res){
           var session = new Sessions();
           session.longitude = req.body.longitude;
           session.latitude = req.body.latitude;
           session.userId = req.body.userId;
           session.username = req.body.username;
           session.bodyFat = req.body.bodyFat;
           session.weight = req.body.weight;
           session.date = Date.now();
           session.save(function(err){
            if(err){
                res.send(err);
            }else{
                res.json("Session has been added!")
            }
        })

    });
    router.get('/getSessionInfo/:userId', function(req,res){
           Sessions.find({"userId": req.params.userId}, function(err,session){
               if(err){
                   res.json(err)
               }else{
                   res.json(session);
               }
           })
    });
    //Route for updating personal trainer info
    router.put('/updatePT/:id', function(req,res){
       User.findById(req.params.id, function(err, user){
          if(err){
              res.send("There has been an error:"+ err )
          }else{

              user.bio = req.body.bio;
              user.collegeAttended = req.body.collegeAttended;
              user.profileImg = req.body.profileImg;
              user.save(function(err){
                  if(err){
                      res.send("Details have not been updated, there has been an error: " + err);
                  }else{
                      res.send("Profile information has been updated!");
                  }
              })
          }
       });

    });
    //Route for adding the personal trainers id to the client
    router.put("/addPTIDToClient/:id", function(req,res){
        User.findById(req.params.trainerId, function(err, data){
            data.personalTrainerId = req.body.trainerId;
            data.save(function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send("Data has been linked");
                }
            })
        });
    });
    //Route for linking clients with personal trainers
    router.put('/linkWithPt/:id', function(req, res){
        User.findById(req.params.id,function (err, user) {
           //Checking to see if the userId already exists before its set

                if(user.client1.userId!==req.body.userId){
                    user.client1.username = req.body.username;
                    user.client1.userId = req.body.userId;
                    user.client1.bodyFat = req.body.bodyFat;
                    user.client1.weight = req.body.weight;
                    user.save(function (err) {
                        if(err){res.send(err)
                        }else{
                            res.send("Congrats, You are now linked");
                        }})
                }else if(user.client2.userId!==req.body.userId){

                    user.client2.username = req.body.username;
                    user.client2.userId = req.body.userId;
                    user.client2.bodyFat = req.body.bodyFat;
                    user.client2.weight = req.body.weight;
                    user.save(function (err) {
                        if(err){res.send(err)}else{
                            res.send("Congrats, You are now linked")
                        }})
                }else if(user.client3.userId!==req.body.userId){

                    user.client3.username = req.body.username;
                    user.client3.userId = req.body.userId;
                    user.client3.bodyFat = req.body.bodyFat;
                    user.client3.weight = req.body.weight;
                    user.save(function (err) {
                        if(err){res.send(err)}else{
                            res.send("Congrats, You are now linked")
                        }})
                }else if(user.client4.userId!==req.body.userId){

                    user.client4.username = req.body.username;
                    user.client4.userId = req.body.userId;
                    user.client4.bodyFat = req.body.bodyFat;
                    user.client4.weight = req.body.weight;
                    user.save(function (err) {
                        if(err){res.send(err)}else{
                            res.send("Congrats, You are now linked")
                        }})
                }else{
                   res.send("Client could not be linked!")
                }
            })
         });
    //Route for linking a user with a gym
    router.put('/linkWithGym/:id', function(req,res){
        User.findById(req.params.id, function(err, user){
            if(err){
                res.send(err)
            }else{
                user.longitude = req.body.longitude;
                user.latitude = req.body.latitude;
                user.save(function(err){
                    if(err){
                        res.send("There has been an error!")
                    }else{
                        res.json("You have been successfully linked with this gym")
                    }
                })
            }
        })
    });
    router.get('/programByName/name', function(req,res){
       Program.find({"name": req.params.name}, function(data){
           if(data){

               res.send(data);
           }else{
               res.send("There has been an error")
           }
       })
    });
    router.put('/program_next/name', function(req,res){
        Program.find({"name": req.params.name}, function(err,program){
            if(err){
                res.send("There has been an error with this request:  "+err)
            }else{
                if(req.body.day2MuscleGroup1){
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

                    program.save(function(err){
                        if(err){
                            res.send(err)
                        }else{
                            res.send("Day 2 has been successfully added to your program! ")
                        }
                    })
                }
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

        //day 5 data
        program.day5.muscleGroup1 = req.body.day5MuscleGroup1;
        program.day5.exercise1 = req.body.day5Exercise1;
        program.day5.sets1 = req.body.day5Sets1;
        program.day5.reps1 = req.body.day5Reps1;
        program.day5.restTime1 = req.body.day5RestTime1;

        program.day5.muscleGroup2 = req.body.day5MuscleGroup2;
        program.day5.exercise2 = req.body.day5Exercise2;
        program.day5.sets2 = req.body.day5Sets2;
        program.day5.reps2 = req.body.day5Reps2;
        program.day5.restTime2 = req.body.day5RestTime2;

        program.day5.muscleGroup3 = req.body.day5MuscleGroup3;
        program.day5.exercise3 = req.body.day5Exercise3;
        program.day5.sets3 = req.body.day5Sets3;
        program.day5.reps3 = req.body.day5Reps3;
        program.day5.restTime3 = req.body.day5RestTime3;

        program.day5.muscleGroup4 = req.body.day5MuscleGroup4;
        program.day5.exercise4 = req.body.day5Exercise4;
        program.day5.sets4 = req.body.day5Sets4;
        program.day5.reps4 = req.body.day5Reps4;
        program.day5.restTime4 = req.body.day5RestTime4;

        //day 6 data
        program.day6.muscleGroup1 = req.body.day6MuscleGroup1;
        program.day6.exercise1 = req.body.day6Exercise1;
        program.day6.sets1 = req.body.day6Sets1;
        program.day6.reps1 = req.body.day6Reps1;
        program.day6.restTime1 = req.body.day6RestTime1;

        program.day6.muscleGroup2 = req.body.day6MuscleGroup2;
        program.day6.exercise2 = req.body.day6Exercise2;
        program.day6.sets2 = req.body.day6Sets2;
        program.day6.reps2 = req.body.day6Reps2;
        program.day6.restTime2 = req.body.day6RestTime2;

        program.day6.muscleGroup3 = req.body.day6MuscleGroup3;
        program.day6.exercise3 = req.body.day6Exercise3;
        program.day6.sets3 = req.body.day6Sets3;
        program.day6.reps3 = req.body.day6Reps3;
        program.day6.restTime3 = req.body.day6RestTime3;

        program.day6.muscleGroup4 = req.body.day6MuscleGroup4;
        program.day6.exercise4 = req.body.day6Exercise4;
        program.day6.sets4 = req.body.day6Sets4;
        program.day6.reps4 = req.body.day6Reps4;
        program.day6.restTime4 = req.body.day6RestTime4;

        //day 7 data
        program.day7.muscleGroup1 = req.body.day7MuscleGroup1;
        program.day7.exercise1 = req.body.day7Exercise1;
        program.day7.sets1 = req.body.day7Sets1;
        program.day7.reps1 = req.body.day7Reps1;
        program.day7.restTime1 = req.body.day7RestTime1;

        program.day7.muscleGroup2 = req.body.day7MuscleGroup2;
        program.day7.exercise2 = req.body.day7Exercise2;
        program.day7.sets2 = req.body.day7Sets2;
        program.day7.reps2 = req.body.day7Reps2;
        program.day7.restTime2 = req.body.day7RestTime2;

        program.day7.muscleGroup3 = req.body.day7MuscleGroup3;
        program.day7.exercise3 = req.body.day7Exercise3;
        program.day7.sets3 = req.body.day7Sets3;
        program.day7.reps3 = req.body.day7Reps3;
        program.day7.restTime3 = req.body.day7RestTime3;

        program.day7.muscleGroup4 = req.body.day7MuscleGroup4;
        program.day7.exercise4 = req.body.day7Exercise4;
        program.day7.sets4 = req.body.day7Sets4;
        program.day7.reps4 = req.body.day7Reps4;
        program.day7.restTime4 = req.body.day7RestTime4;

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
        gym.profileImg = req.body.profileImg;
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
    //Route for deleting a gym on the marketplace
    router.delete('/deleteGym/:id', function(req,res){
        Gym.findByIdAndRemove(req.params.id, function(data){
            if(data){
                res.send("This gym has now been removed")
            }else{
                res.send("Gym could not be removed")
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
            user.isPersonalTrainerTemp = req.body.isPersonalTrainerTemp;
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
        User.findOne({username:req.body.username}).select('email username password isPersonalTrainer _id isAdmin longitude latitude bodyFat height weight client1.username client1.userId client1.bodyFat client1.weight client2.username client2.userId client2.bodyFat client2.weight client3.username client3.userId client3.bodyFat client3.weight client4.username client4.userId client4.bodyFat client4.weight').exec(function(err,user){
            if(err) throw err;
                if(!user){
                    res.json({success:false, message:'No such user found!'});
                }else if (user) if (req.body.password) {
                    var validatePassword = user.comparePassword(req.body.password);
                    if (!validatePassword) {
                        res.json({success : false, message : 'Password incorrect'});
                    }else{
                        var token = jwt.sign(
                            {
                                username: user.username,
                                email: user.email,
                                isPersonalTrainer: user.isPersonalTrainer,
                                userId: user._id,
                                isAdmin: user.isAdmin,
                                longitude: user.longitude,
                                latitude: user.latitude,
                                bodyFat: user.bodyFat,
                                height: user.height,
                                weight: user.weight,
                                user1_username:user.client1.username,
                                user1_userId:user.client1.userId,
                                user1_bodyFat:user.client1.bodyFat,
                                user1_weight:user.client1.weight,
                                user2_username:user.client2.username,
                                user2_userId:user.client2.userId,
                                user2_bodyFat:user.client2.bodyFat,
                                user2_weight:user.client2.weight,
                                user3_username:user.client3.username,
                                user3_userId:user.client3.userId,
                                user3_bodyFat:user.client3.bodyFat,
                                user3_weight:user.client3.weight,
                                user4_username:user.client4.username,
                                user4_userId:user.client4.userId,
                                user4_bodyFat:user.client4.bodyFat,
                                user4_weight:user.client4.weight

                            }, secret, {expiresIn: '24h'});
                        res.json({
                            success : true,
                            token:token,
                            userId:user._id,
                            username:user.username,
                            bodyFat:user.bodyFat,
                            weight:user.weight,
                            longitude: user.longitude,
                            latitude: user.latitude,
                            user1_username: user.client1.username,
                            user1_userId: user.client1.userId,
                            user1_bodyFat: user.client1.bodyFat,
                            user1_weight: user.client1.weight,
                            user2_username: user.client2.username,
                            user2_userId: user.client2.userId,
                            user2_bodyFat: user.client2.bodyFat,
                            user2_weight: user.client2.weight,
                            user3_username: user.client3.username,
                            user3_userId: user.client3.userId,
                            user3_bodyFat: user.client3.bodyFat,
                            user3_weight: user.client3.weight,
                            user4_username: user.client4.username,
                            user4_userId: user.client4.userId,
                            user4_bodyFat: user.client4.bodyFat,
                            user4_weight: user.client4.weight

                            /// You have to res the token here. You can return the user id if you want but make sure to include the token
                        });
                    }
                }else{
                    res.json({success : false, message : 'No password provided!'});
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
