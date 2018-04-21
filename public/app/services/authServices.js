angular.module('authServices', [])

.factory('Auth', function($http, AuthToken, $q){
     var authFactory = {};
    var app = this;

    authFactory.login = function (loginData) {
        return $http.post('/api/authenticate', loginData).then(function(data){
              AuthToken.setToken(data.data.token);
              return data;
        })
    };
    authFactory.getAllUserInfo = function () {
        return $http.get('/api/getAllUserInfo').then(function(data){
            return data;
        });
    };
    authFactory.deleteGym = function (id) {
        return $http.delete('/api/deleteGym/' + id).then(function(data) {
            return data;
        });
    };
    authFactory.deleteUser = function (id) {
        return $http.delete('/api/deleteUser/' + id).then(function(data) {
            return data;
        });
    };
    authFactory.personalTrainersPrograms = function(id){
        return $http.get('api/personalTrainersPrograms/'+ id).then(function(programs) {
            return programs;
        });
    };
    authFactory.getAllPrograms = function(){
        return $http.get('api/getAllPrograms').then(function(programs) {
            return programs;
        });
    };
    authFactory.getSingleSession = function(id){
        return $http.get('api/getSingleUserSessions/' +id).then(function(users) {
            return users;
        });
    };
    authFactory.removeClient1 = function(id){
        return $http.put('/api/removeClient1/' + id).then(function(data){
            return data;
        })
    };
    authFactory.removeClient2 = function(id){
        return $http.put('/api/removeClient2/' + id).then(function(data){
            return data;
        })
    };
    authFactory.removeClient3 = function(id){
        return $http.put('/api/removeClient3/' + id).then(function(data){
            return data;
        })
    };

    authFactory.removeClient5 = function(id){
        return $http.put('/api/removeClient5/' + id).then(function(data){
            return data;
        })
    };
    authFactory.isLoggedIn = function(){
      if(AuthToken.getToken()){
          return true;
      }else{
          return false;
      }
    };
    authFactory.facebook = function(token) {
        AuthToken.setToken(token);
    };
    authFactory.getPersonalTrainers = function(){
      return $http.get('api/getPersonalTrainers').then(function(users){
          return users;
      })
    };
    authFactory.getPersonalTrainerRequests = function(){
        return $http.get('api/personalTrainerRequests').then(function(users){
            return users;
        })
    };
    authFactory.updatePtInfo = function(id, formData){
      return $http.put('api/updatePT/' + id, formData).then(function(users){
          return users;
      })
    };
    authFactory.makeTrainer = function(id){
        return $http.put('api/makeTrainer/' + id).then(function(users){
            return users;
        })
    };
    authFactory.linkWithPt = function(id,formData){
        return $http.put('api/linkWithPt/' + id,formData).then(function(users){
            return users;
        })
    };
    authFactory.linkWithGym = function(id,formData){
        return $http.put('api/linkWithGym/'+ id,formData).then(function(users){
            return users;
        })
    };
    authFactory.addPTIDtoUser = function(id, trainerId ){
        $http.put('api/addPTIDToClient/'+id ,trainerId).then(function (data) {
            return data;
        });
    };
    authFactory.listSessionInfo =function(id){
        return $http.get('api/getSessionInfo/' + id).then(function(users){
            return users;
        })
    };
    authFactory.getUserInfo = function(id){
        return $http.get('api/getUserInfo/' + id).then(function(users){
            return users
        })
    };
    authFactory.updateProfileInfo = function (id, formData) {
        return $http.put('api/updateProfileInfo/' + id, formData).then(function(users){
            return users
        })
    };
    authFactory.updateProfilePassword = function (id, formData) {
        return $http.put('api/updateProfilePassword/' + id, formData).then(function(users){
            return users
        })
    };



    authFactory.getUser = function () {
      if(AuthToken.getToken()){
          return $http.post('api/currentUser');

      }else{
          $q.reject({message: 'No token for this user'})
      }
    };

    authFactory.logout = function(){
       AuthToken.setToken();

    };
    return authFactory;
})


    .factory('AuthToken', function($window){
      var authTokenFactory = {};

      authTokenFactory.setToken = function (token) {
          if(token){
              $window.localStorage.setItem('token',token);
          }else{
              $window.localStorage.removeItem('token');
          }

      };
      authTokenFactory.getToken = function(){
        return $window.localStorage.getItem('token');
      };

      return authTokenFactory;

    })
.factory('authIntercept',function (AuthToken) {

     var authInterceptFactory = {};

    authInterceptFactory.request = function (config) {

        var token = AuthToken.getToken();
        //assigns tokens to the headers so that it can be grabbed at the front end
        if(token) config.headers['x-access-token'] = token;
       return config;
    };
     return authInterceptFactory;
});
