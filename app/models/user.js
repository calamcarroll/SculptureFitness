var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt       = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {type: String, lowercase:true, required: true, unique:true},
    password: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique:true},
    isPersonalTrainer:{type: Boolean},
    isAdmin:{type: Boolean},
    weight:{type:Number},
    height:{type:Number},
    bodyFat:{type:Number},
    hasGoneGym:{type:Number},
    gymOfChoice:{type:String}

});
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function(err,hash){
        if(err)return next(err);
        user.password = hash;
        next();
    });
});
//compare the password the user provided at the login to the password of the user
UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', UserSchema);