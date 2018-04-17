angular.module('mainController', ['authServices'])
    .controller('mainController', function($http,Auth, $timeout,$scope, $location, $rootScope, $window,userUpdateService) {
        var app = this;
        $rootScope.$on('$routeChangeStart', function() {
            // When the page loads we invoke the isLoggedIn function it gets the token and if it is there it returns true.
            if (Auth.isLoggedIn()) {
                    Auth.getUser().then(function(data){

                    app.username = data.data.username;
                    app.email = data.data.email;
                    app.userId = data.data.userId;
                    app.isPersonalTrainer = data.data.isPersonalTrainer;
                    app.isAdmin = data.data.isAdmin;
                    app.bodyFat = data.data.bodyFat;
                    app.weight = data.data.weight;
                    app.height = data.data.height;

                        app.client1_name = data.data.user1_username;
                        app.client1_userId = data.data.user1_userId;
                        app.client1_bodyFat = data.data.user1_bodyFat;
                        app.client1_weight = data.data.user1_weight;

                        app.client2_name = data.data.user2_username;
                        app.client2_userId = data.data.user2_userId;
                        app.client2_bodyFat = data.data.user2_bodyFat;
                        app.client2_weight = data.data.user2_weight;

                        app.client3_name = data.data.user3_username;
                        app.client3_userId = data.data.user3_userId;
                        app.client3_bodyFat = data.data.user3_bodyFat;
                        app.client3_weight = data.data.user3_weight;

                        app.client4_name = data.data.user4_username;
                        app.client4_userId = data.data.user4_userId;
                        app.client4_bodyFat = data.data.user4_bodyFat;
                        app.client4_weight = data.data.user4_weight;

                    app.limit = 5;

                    app.isLoggedIn = true;

                        Auth.listSessionInfo(data.data.userId).then(function (data) {
                            $scope.sessionsList =  data.data;
                        });
                        Auth.getUserInfo(data.data.userId).then(function(data){
                            $scope.Quantity = 5;
                            $scope.clientList = data;
                        });
                });
            } else {
                app.isLoggedIn = false;
                app.username = '';

            }// Removing characters Facebook log in adds to URL.
            if ($location.hash() === '_=_') $location.hash(null);
        });


        Auth.getPersonalTrainers().then(function (data){
                 $scope.trainerList = data.data;
            });
        Auth.getPersonalTrainerRequests().then(function (data){
            $scope.requestList = data.data;
        });

        this.deleteGym = function (id) {
            Auth.deleteGym(id).then(function(){
                $timeout(function () {
                    $location.path('/gym_options');
                    app.Success= false;
                },2000);
                })
        };
        this.goToUpdatePage= function(id){
            $http.get('Api/getSingleGym/'+id).then(function(gyms){
                $scope.formData = {};
                $scope.formData = gyms.data;
              $location.path("/finalGymUpdate")
            });

        };
        this.updateGymFinal = function(formData){
            $http.put('Api/updateGym/'+formData._id, formData).then(function(gyms){
                if(!gyms){
                    console.log("There has been an error updating this gym! ");
                }else{
                    $timeout(function () {
                        $location.path('/gym_options');

                    },2000);
                }

            });
        };


        this.viewSingleUserSessions = function(id){
          $location.path('/singleUserSession');
         Auth.getSingleSession(id).then(function(data){
             if(!data){
                 console.log("There has been an error retrieving data")
             }else{
                 Auth.getUserInfo(id).then(function(data){

                 });

                 $scope.sessionList = data.data;
             }
         })
      };



        this.removeClient1 = function(id){
            Auth.removeClient1(id).then(function(data){
                if(!data){
                    console.log("Could not un-link with this client");
                    app.error = true;
                    app.Success = false;
                    app.error = "Could not be unlinked with client";
                }else{
                     console.log("You have now been un-linked with this client");
                     app.Success = true;
                     app.error = false;
                     app.Success = "You have been unlinked! changes will be seen when you log in next";

                    $timeout(function () {
                        $location.path('/sessions');
                        app.Success= false;
                    },2000);
                }
            })
        };
        this.removeClient2 = function(id){
            Auth.removeClient2(id).then(function(data){
                if(!data){
                    console.log("Could not un-link with this client");
                    app.error = true;
                    app.Success = false;
                    app.error = "Could not be unlinked with client";
                }else{
                    console.log("You have now been un-linked with this client");
                    app.Success = true;
                    app.error = false;
                    app.Success = "You have been unlinked! changes will be seen when you log in next";

                    $timeout(function () {
                        $location.path('/sessions');
                        app.Success= false;
                    },2000);
                }
            })
        };
        this.removeClient3 = function(id){
            Auth.removeClient3(id).then(function(data){
                if(!data){
                    console.log("Could not un-link with this client");
                    app.error = true;
                    app.Success = false;
                    app.error = "Could not be unlinked with client";
                }else{
                    console.log("You have now been un-linked with this client");
                    app.Success = true;
                    app.error = false;
                    app.Success = "You have been unlinked! changes will be seen when you log in next";

                    $timeout(function () {
                        $location.path('/sessions');
                        app.Success= false;
                    },2000);
                }
            })
        };
        this.removeClient4 = function(id){
            Auth.removeClient4(id).then(function(data){
                if(!data){
                    console.log("Could not un-link with this client");
                    app.error = true;
                    app.Success = false;
                    app.error = "Could not be unlinked with client";
                }else{
                    console.log("You have now been un-linked with this client");
                    app.Success = true;
                    app.error = false;
                    app.Success = "You have been unlinked! changes will be seen when you log in next";

                    $timeout(function () {
                        $location.path('/sessions');
                        app.Success= false;
                    },2000);
                }
            })
        };

        this.makeTrainer = function(id){
            Auth.makeTrainer(id).then(function(data){
                if(!data){
                    console.log("Personal Trainer could not be updated")
                }else{

                    $timeout(function () {
                        $location.path('/gyms_trainers');
                    },2000);
                }
            })
        };
        this.linkClient = function(id){

          Auth.getUser().then(function(data){

              $scope.formData = {};
              $scope.formData.username = data.data.username;
              $scope.formData.userId = data.data.userId;
              $scope.formData.bodyFat = data.data.bodyFat;
              $scope.formData.weight = data.data.weight;

              Auth.linkWithPt(id,$scope.formData).then(function(data){

                  if(data){
                      app.Success= true;
                      app.error = false;
                      app.Success = "Congrats you are now linked";
                      $timeout(function() {
                          $location.path('/profile');
                      }, 2000);
                  }else{
                      app.Success = false;
                      app.error = true;
                      app.error = "Could not be linked with this client!"


                  }

              });
          })
        };
        this.linkWithGym = function(longitude, latitude){
            Auth.getUser().then(function(data){
               var userId = data.data.userId;
               $scope.formData = {};
               $scope.formData.longitude = longitude;
               $scope.formData.latitude  = latitude;
               Auth.linkWithGym(userId,$scope.formData).then(function(data){
                    if(data){
                        console.log("You are now linked with this gym! ");
                        $timeout(function() {
                            $location.path('/profile');
                        }, 2000);
                    }else{
                        console.log("There has been an error!" + longitude + latitude);
                        app.success = false;
                        app.error = "There has been an error with this gym match";

                    }
                });
            });

        };
        this.getUserInfo = function(id){
                Auth.getUserInfo(id).then(function(data){

                userUpdateService.username = data.data.username;
                userUpdateService.password = data.data.password;
                userUpdateService.email = data.data.email;
                userUpdateService.weight = data.data.weight;
                userUpdateService.height = data.data.height;
                userUpdateService.bodyFat = data.data.bodyFat;
                userUpdateService.gymOfChoice = data.data.gymOfChoice;
                userUpdateService.userId = id;

                    $scope.formData = {};
                    $scope.formData.username = userUpdateService.username;
                    $scope.formData.password = userUpdateService.password;
                    $scope.formData.email = userUpdateService.email;
                    $scope.formData.weight = userUpdateService.weight;
                    $scope.formData.height = userUpdateService.height;
                    $scope.formData.bodyFat = userUpdateService.bodyFat;
                    $scope.formData.gymOfChoice = userUpdateService.gymOfChoice;


                });
        };
        this.updatePtInfo = function () {
            Auth.getUser().then(function(data){
                console.log(data.data.userId);
                var id = data.data.userId;
                Auth.updatePtInfo(id, $scope.formData).then(function(data){
                    if(!data){
                        console.log("There has been an error with this update")
                    }else{
                        $timeout(function () {
                            $location.path('/profile');
                        },2000);
                    }
                })
            });

        };
        this.updateProfile = function(){
            var id = userUpdateService.userId;
            Auth.updateProfileInfo(id,$scope.formData).then(function(data){
               if(!data){
                   console.log("There has been an error with this update")
               }else{
                   $timeout(function () {
                       $location.path('/profile');
                       window.location.reload();
                   },2000);
               }
            });
        };
        this.updateProfilePassword = function(){
            var id = userUpdateService.userId;
            Auth.updateProfilePassword(id,$scope.formData).then(function(data){
                if(!data){
                    console.log("There has been an error with this update")
                }else{
                    $timeout(function () {
                        $location.path('/profile');
                        window.location.reload();
                    },2000);
                }
            });
        };
        // Used to stop Facebook opening multiple windows.
        this.facebook = function() {
            $window.location = $window.location.protocol + '//' +$window.location.host + '/auth/facebook';
        };
        // Used to stop Twitter opening multiple windows.
        this.twitter = function() {
            $window.location = $window.location.protocol + '//' +$window.location.host + '/auth/twitter';
        };
        // Used to stop Google opening multiple windows.
        this.google = function() {
            $window.location = $window.location.protocol + '//' +$window.location.host + '/auth/google';
        };

        app.doLogin = function(loginData) {
            app.errorMsg = false;
            Auth.login(app.loginData).then(function(data) {
                window.location.reload();
                if (data.data.Success){
                    app.success = data.data.message + ' Redirecting.';
                    $timeout(function() {
                        $location.path('/');

                        app.loginData = '';
                        app.Success = false;
                    }, 2000);
                } else {
                    app.errorMsg = data.data.message;
                }
            });
        };

        // User presses log out and uses Auth.logout to remove the token.
        this.logout = function () {
            Auth.logout();
            // Redirecting the user back to the home page.
                $timeout(function() {
                    $location.path('/');
                    app.username="";

                    window.location.reload()
                }, 2000);
        };
    });



