angular.module('mainController', ['authServices'])

    .controller('mainController', function(Auth, $timeout, $location, $rootScope, $window) {
        var app = this;

        // Going to hide the HTML until this becomes true to hide the angular.
        app.loadme=false;

        // Anytime a route changes this invokes everything within the brackets.
        $rootScope.$on('$routeChangeStart', function() {
            // When the page loads we invoke the isLoggedIn function it gets the token and if it is there it returns true.
            if (Auth.isLoggedIn()) {
                app.isLoggedIn = true;
                // If the user is logging in then get that current user.
                Auth.getUser().then(function(data) {
                    app.username = data.data.username;
                    app.useremail = data.data.email;
                    app.text = 'Logout';
                    app.loadme=true;
                });
            } else {
                app.isLoggedIn = false;
                app.username = '';
                app.loadme=true;
                app.text='Log In';
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

        this.doLogin = function(loginData) {
            app.loading = true;
            app.errorMsg = false;

            Auth.login(app.loginData).then(function(data) {
                if (data.data.success){
                    app.loading = false;
                    // Create Success Msg
                    app.successMsg = data.data.message + ' Redirecting.';
                    // Redirect to Home Page
                    $timeout(function() {
                        $location.path('/about');
                        // Removing the login data and the success message from the login page when someone logs in.
                        app.loginData = '';
                        app.successMsg = false;
                    }, 2000);
                } else {
                    // Creating Error Msg
                    app.loading = false;
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
                    window.location.reload()
                }, 2000);


        };
    });



