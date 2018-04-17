angular.module('gymController', ['authServices'])
.controller('gymCtrl', function(Auth,$http,$scope,$location,$timeout){
    var app = this;
    $http.get('Api/getGyms').then(function(gyms){
        $scope.gymList = gyms.data;
    });


    app.addGym = function(gymData){
        $http.post('Api/gym',gymData).then(function(gyms){
           if(!gyms){
               console.log("There has been an error with adding this gym")

           }else{
               console.log(gyms);
               $timeout(function() {
                   $location.path('/gymMarketplace');
                   app.error = false;
                   app.Success = false
               }, 2000);

           }
        });
    };


});