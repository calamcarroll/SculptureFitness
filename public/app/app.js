angular.module('SculptureFitness',['SculptureFitnessRoutes','userController', 'userServices','ngAnimate', 'mainController', 'authServices', 'gymController'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authIntercept');
    });