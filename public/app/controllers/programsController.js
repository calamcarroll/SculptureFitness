angular.module('programsController', ['authServices'])
    .controller('programsCtrl', function(Auth,$http,$scope,$location){
        var app = this;
        $http.get('Api/getPrograms').then(function(programs){
            $scope.programs = programs.data;
            console.log(programs.data);
        });

        app.choice = function() {
            console.log("button has been clicked");
            $location.path("/myPrograms");
        }
    });