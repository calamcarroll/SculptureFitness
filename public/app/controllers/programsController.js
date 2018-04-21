angular.module('programsController', ['authServices'])
    .controller('programsCtrl', function(Auth,$http,$scope,$location){
        app = this;
        app.choice = function(id) {
             programId = id;
            $location.path("myPrograms");
        };
        app.find = function(id) {
             var programId = id;
            $location.path("programsFinder_programs");
        };

        Auth.getUser().then(function(data){
            $http.get('Api/getPrograms/'+ data.data.userId).then(function(programs){
                $scope.prog = programs.data;
                app.name = programs.data.name;
                app.data = true;
                if(programs.data.day5 = programs) {
                    app.data5 = false;
                }
            });
        });

    })
.controller('singleProgramsCtrl', function(Auth,$http,$scope){
    $http.get('Api/getProgramsById/'+ programId).then(function(programByName){
        $scope.data = programByName.data;

    });
});
