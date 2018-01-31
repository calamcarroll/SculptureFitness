angular.module('SculptureFitness',['SculptureFitnessRoutes','userController', 'userServices','ngAnimate', 'mainController', 'authServices'])

.config(function ($httpProvider) {
   $httpProvider.interceptors.push('authIntercept');
});