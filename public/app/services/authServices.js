angular.module('authServices', [])

.factory('Auth', function($http, AuthToken,$window){
     var authFactory = {};
    var app = this;

    authFactory.login = function (loginData) {
        return $http.post('/api/authenticate', loginData).then(function(data){
          console.log(data.data.token);

              AuthToken.setToken(data.data.token);
              $window.location.reload();
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

    authFactory.getUser = function () {
      if(AuthToken.getToken()){
          return $http.post('api/currentUser')
      }else{
          $q.reject({message: 'No token for this user'})
      }
    };

    authFactory.logout = function(){
       AuthToken.setToken();
        $window.location.reload();
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
