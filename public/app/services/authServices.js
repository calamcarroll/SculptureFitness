angular.module('authServices', [])

.factory('Auth', function($http, AuthToken){
     var authFactory = {};
    var app = this;

    authFactory.login = function (loginData) {
        return $http.post('/api/authenticate', loginData).then(function(data){
              AuthToken.setToken(data.data.token);
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
    authFactory.getUserInfo = function(id){
        return $http.get('api/getUserInfo/' + id).then(function(users){
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
