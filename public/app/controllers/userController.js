angular.module('userController',['userServices'])

.controller('registerController',function ($http, $location, $timeout, user) {

    var app = this;

    this.regUser = function (regData) {
        app.loading=true;
        app.errorMsg=false;
        user.create(app.regData).then(function (data) {

            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message;
                //2 second pause added after button is clicked for delaying
                $timeout(function(){
                    $location.path('/');
                }, 2000);

            }else{
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        })
    }
});