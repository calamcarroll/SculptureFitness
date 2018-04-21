var app = angular.module('SculptureFitnessRoutes', ['ngRoute']);
app.service('userUpdateService', function(){
    var userUpdateService = {
        username:'',
        password:'',
        email:'',
        weight:'',
        height:'',
        bodyFat:'',
        gymOfChoice:'',
        userId: ''
    };
    return userUpdateService;
});
app.config(function($routeProvider,$locationProvider){

    $routeProvider
        .when('/PtRequests',{
            templateUrl: 'app/views/pages/trainers/PtRequests.html'
        })
        .when('/createProgram',{
            templateUrl: 'app/views/pages/users/createProgram.html'
        })
        .when('/programs_update_page',{
            templateUrl: 'app/views/pages/users/programs_update_page.html'
        })
        .when('/programFinder',{
            templateUrl: 'app/views/pages/general/programFinder.html',
            controller:'programsCtrl',
            controllerAs: 'programsCtrl'
        })
        .when('/preDeleteProgram',{
            templateUrl: 'app/views/pages/users/preDeleteProgram.html'
        })
        .when('/program_landingPage', {
            templateUrl: 'app/views/pages/users/program_landingPage.html'
        })
        .when('/update_program_clients', {
            templateUrl: 'app/views/pages/users/update_program_clients.html'
        })
        .when('/create_program_clients',{
            templateUrl: 'app/views/pages/users/create_program_clients.html'
        })
        .when('/clientSessions',{
            templateUrl: 'app/views/pages/trainers/clientSessions.html'
        })
        .when('/createGym',{
            templateUrl: 'app/views/pages/trainers/createGym.html',
            controller: 'gymCtrl',
            controllerAs: 'gym'
        })
        .when('/finalGymUpdate',{
            templateUrl: 'app/views/pages/trainers/finalGymUpdate.html',
            controller: 'gymCtrl',
            controllerAs: 'gym'
        })
        .when('/deleteGym',{
        templateUrl: 'app/views/pages/trainers/deleteGym.html',
        controller: 'gymCtrl',
        controllerAs: 'gym'
        })
        .when('/updateGyms',{
            templateUrl: 'app/views/pages/trainers/updateGyms.html',
            controller: 'gymCtrl',
            controllerAs: 'gym'
        })
        .when('/gym_options',{
            templateUrl: 'app/views/pages/trainers/gym_options.html'
        })
        .when('/singleUserSession',{
            templateUrl: 'app/views/pages/trainers/singleUserSession.html'
        })
        .when('/sessions',{
            templateUrl: 'app/views/pages/users/sessions.html'
        })
        .when('/myClients',{
            templateUrl: 'app/views/pages/trainers/myClients.html'
        })
        .when('/gymMarketplace',{
            templateUrl: 'app/views/pages/trainers/gymMarketplace.html',
            controller:'gymCtrl',
            controllerAs: 'gym'
        })
        .when('/findGym',{
            templateUrl: 'app/views/pages/trainers/findGym.html'
        })
        .when('/trainerSection',{
            templateUrl: 'app/views/pages/trainers/trainerSection.html'
        })
        .when('/findMyPrograms',{
            templateUrl: 'app/views/pages/users/findMyPrograms.html',
            controller:'programsCtrl',
            controllerAs: 'programsCtrl'
        })
        .when('/myPrograms',{
            templateUrl: 'app/views/pages/users/myPrograms.html',
            controller:'singleProgramsCtrl',
            controllerAs: 'singleProgramsCtrl'
        })
        .when('/programsFinder_programs',{
            templateUrl: 'app/views/pages/general/programsFinder_programs.html',
            controller:'singleProgramsCtrl',
            controllerAs: 'singleProgramsCtrl'
        })

        .when('/gyms_trainers',{
            templateUrl: 'app/views/pages/trainers/gyms_trainers.html'
        })
        .when('/gyms',{
            templateUrl: 'app/views/pages/trainers/gyms.html',
            controller:'gymCtrl',
            controllerAs: 'gym'
        })
        .when('/preUpdateProfileInfo',{
        templateUrl: 'app/views/pages/users/preUpdateProfileInfo.html'
        })
        .when('/trainerMarketplace',{
            templateUrl: 'app/views/pages/trainers/trainerMarketplace.html',
            controller:'mainController',
            controllerAs: 'main'
        })
        .when('/',{
            templateUrl: 'app/views/pages/general/home.html'
        })
        .when('/marketplace',{
            templateUrl: 'app/views/pages/trainers/marketplace.html'
        })
        .when('/trainerLogin',{
            templateUrl: 'app/views/pages/trainers/trainerLogin.html'
        })
        .when('/about',{
            templateUrl: 'app/views/pages/general/about.html'
        })
        .when('/updateProfileInfo',{
            templateUrl: 'app/views/pages/users/updateProfileInfo.html'
        })
        .when('/updatePtInfo',{
            templateUrl: 'app/views/pages/trainers/updatePtInfo.html'
        })
        .when('/register',{
            templateUrl: 'app/views/pages/users/register.html',
            controller:'registerController',
            controllerAs: 'register'
        })
        .when('/clientLogin',{
            templateUrl: 'app/views/pages/users/clientLogin.html'
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
            templateUrl: 'app/views/pages/users/clientLogin.html',
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
            templateUrl: 'app/views/pages/users/clientLogin.html',
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
            templateUrl: 'app/views/pages/users/clientLogin.html',
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




