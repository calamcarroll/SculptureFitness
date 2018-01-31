angular.module('SculptureFitnessRoutes', ['ngRoute'])

.config(function($routeProvider,$locationProvider){

    $routeProvider
        .when('/',{
        templateUrl: 'app/views/pages/home.html'
        })
        .when('/about',{
            templateUrl: 'app/views/pages/about.html'
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

        .otherwise({redirectTo: '/'});


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});




