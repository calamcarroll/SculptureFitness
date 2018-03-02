angular.module('SculptureFitnessRoutes', ['ngRoute'])

.config(function($routeProvider,$locationProvider){

    $routeProvider
        .when('/',{
        templateUrl: 'app/views/pages/general/home.html'
        })
        .when('/marketplace',{
            templateUrl: 'app/views/pages/trainers/marketplace.html'
        })

        .when('/about',{
            templateUrl: 'app/views/pages/general/about.html'
        })
        .when('/register',{
            templateUrl: 'app/views/pages/users/register.html',
            controller:'registerController',
            controllerAs: 'register'
        })
        .when('/login',{
            templateUrl: 'app/views/pages/users/login.html'
        })
        .when('/profile',{
            templateUrl:'app/views/pages/users/profile.html'
        })

        .when('/facebook/:token', {
            templateUrl: 'app/views/pages/users/profile.html',
            controller: 'facebookCtrl',
            controllerAs: 'facebook'
        })

        .when('/facebookerror',{
            templateUrl: 'app/views/pages/users/login.html',
            controller: 'facebookCtrl',
            controllerAs: 'facebook',
            authenticated: false
        })

        .when('/twitter/:token',{
            templateUrl: 'app/views/pages/users/profile.html',
            controller: 'twitterCtrl',
            controllerAs: 'twitter',
            authenticated: false
        })

        .when('/twittererror',{
            templateUrl: 'app/views/pages/users/login.html',
            controller: 'twitterCtrl',
            controllerAs: 'twitter',
            authenticated: false
        })

        .when('/google/:token',{
            templateUrl: 'app/views/pages/users/profile.html',
            controller: 'twitterCtrl',
            controllerAs: 'twitter',
            authenticated: false
        })

        .when('/googleerror',{
            templateUrl: 'app/views/pages/users/login.html',
            controller: 'googleCtrl',
            controllerAs: 'google',
            authenticated: false
        })

        .otherwise({redirectTo: '/'});


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});




