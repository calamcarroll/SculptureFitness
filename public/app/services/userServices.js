angular.module('userServices',[])

.factory('user', function($http){
   userFactory = {};

   userFactory.create = function (regData) {
       return $http.post('/api/users', regData)
   };
    return userFactory;
});


