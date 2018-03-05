angular.module('mainController', ['authServices'])
    .controller('mainController', function(Auth, $timeout, $location, $rootScope, $window) {
        var app = this;

        $rootScope.$on('$routeChangeStart', function() {

            // When the page loads we invoke the isLoggedIn function it gets the token and if it is there it returns true.
            if (Auth.isLoggedIn()) {
                    Auth.getUser().then(function(data){
                    app.username = data.data.username;
                    app.email = data.data.email;
                    console.log(app.username);
                    app.isLoggedIn = true;
                });
            } else {
                app.isLoggedIn = false;
                app.username = '';

            }
            // Removing characters Facebook log in adds to URL.
            if ($location.hash() === '_=_') $location.hash(null);
        });

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



