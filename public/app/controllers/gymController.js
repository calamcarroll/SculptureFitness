angular.module('gymController', ['authServices'])
.controller('gymCtrl', function(Auth,$http,$scope){
    var app = this;
    $http.get('Api/getGyms').then(function(gyms){
        $scope.gymList = gyms.data;
    });
});