angular.module('mainController', ['authServices'])
.controller('mainController', function(Auth,$timeout,$location,$route,$window){

var app = this;
app.loadme =false;
if(Auth.isLoggedIn()){

    console.log('Logged in');
    Auth.getUser().then(function (data) {
        console.log(data.data.username);
        app.username = data.data.username;
        app.email = data.data.email;
        app.loadme=true;
        app.text = 'logout';


    })
}else{
    app.text ='log in';
    console.log('Not logged in')
}


    this.doLogin = function (loginData) {
        app.loading=true;
        app.errorMsg=false;
        Auth.login(app.loginData).then(function (data) {

            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message;
                $location.path('/');
                //2 second pause added after button is clicked for delaying
                $timeout(function(){
                    $location.path('/');
                }, 2000);

            }else{
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });

    };
    this.logout = function(){
        Auth.logout();
        $location.path('/');
        $timeout(function(){
            $location.path('/');
        },2000)
    };


});

