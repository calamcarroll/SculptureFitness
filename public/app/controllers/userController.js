angular.module('userController', ['userServices'])
    .controller('registerController', function($http, $location, $timeout, User) {
        var app = this;
        app.regUser = function(regData) {
            app.error = false;
            User.create(app.regData).then(function(data) {
                if (data.data.success){

                    app.Success = data.data.message + ' Redirecting.';
                    $timeout(function() {
                        $location.path('/home');
                        app.error = false;
                        app.Success = false
                    }, 2000);
                } else {
                    app.error = data.data.message;
                }
            })
        }
    })

    .controller('facebookCtrl', function($routeParams, $location, Auth, $window) {
        var app = this;

        if ($window.location.pathname === '/facebookerror') {
            app.errorMsg = 'Facebook e-mail not found in database.';
        } else {
            Auth.facebook($routeParams.token);
            // Redirecting user.
            $location.path('/');
        }
    })

    .controller('twitterCtrl', function($routeParams, $location, Auth, $window) {
        var app = this;

        if ($window.location.pathname === '/twittererror') {
            app.errorMsg = 'Twitter e-mail not found in database.';
        } else {
            Auth.facebook($routeParams.token);
            // Redirecting user.
            $location.path('/');
        }
    })

    .controller('googleCtrl', function($routeParams, $location, Auth, $window) {
        var app = this;

        if ($window.location.pathname === '/googleerror') {
            app.errorMsg = 'Google e-mail not found in database.';
        } else {
            Auth.facebook($routeParams.token);
            // Redirecting user.
            $location.path('/');
        }
    });