var User                   = require('../models/user');
module.exports = function(router){

    router.post('/users', function (req, res) {

        var user = new User();
    user.username      = req.body.username;
    user.password      = req.body.password;
    user.email         = req.body.email;

    if(req.body.username == null || req.body.username == ''|| req.body.password == null || req.body.password ==''| req.body.email == null || req.body.email == ''){

        res.json({success: false, message: '\'Please provide all required fields\''})
    }else{
        user.save(function(err){
            if(err){

                res.json({success: false, message: '\'User already exists with this username or email\''})
            }else{

                res.json({success:true, message:'User created!'})
            }
        });
    }
});

    return router;
};
