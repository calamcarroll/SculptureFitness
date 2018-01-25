angular.module('mainController', ['authServices'])
.controller('mainController', function(Auth,$timeout,$location){

var app = this;


    this.doLogin = function (loginData) {
        app.loading=true;
        app.errorMsg=false;
        Auth.login(app.loginData).then(function (data) {

            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message;
                //2 second pause added after button is clicked for delaying
                $timeout(function(){
                    $location.path('/about');
                }, 2000);

            }else{
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        })
    }



});

