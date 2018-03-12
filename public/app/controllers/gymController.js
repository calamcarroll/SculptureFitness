angular.module('gymController', ['authServices'])
.controller('gymCtrl', function(Auth,$http,$scope,$location,$timeout){
    var app = this;
    $http.get('Api/getGyms').then(function(gyms){
        $scope.gymList = gyms.data;
        $scope.name = gyms.data.name;
        console.log(gyms.data);

        if(gyms.data.name === "kingfisher fitness waterford"){
            $scope.image = "https://pbs.twimg.com/media/ClYp320VYAARGm5.jpg"
        }else{
            $scope.image = "https://www.goldstonefitness.ie/images/uploads/goldstone-icon.jpg"
        }
    });
});