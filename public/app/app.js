angular.module('SculptureFitness',['SculptureFitnessRoutes','userController', 'userServices','ngAnimate', 'mainController', 'authServices', 'gymController', 'mapsController', 'gymServices'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authIntercept');
    });