angular.module('gymServices', [])

    .factory('Gym', function($http, AuthToken){
        var authFactory = {};
        var app = this;


        authFactory.getGymCoords = function(){
            return $http.get('Api/getGyms').then(function(gyms){
                return gyms
            })
        };



        return authFactory;
    });



