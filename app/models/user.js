var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt       = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {type: String, lowercase:true, required: true, unique:true},
    password: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique:true},
    personalTrainerId:{type:String},
    isPersonalTrainerTemp:{type: Boolean},
    isPersonalTrainer:{type: Boolean},
    isAdmin:{type: Boolean},
    bio:{type: String},
    collegeAttended:{type: String},
    profileImg: { data: Buffer, contentType: String },

        client1:{

            username:{type: String},
            userId:{type: String},
            bodyFat:{type: Number},
            weight:{type:Number},
            comment:{type: String}
        },
        client2:{
            comment:{type: String},
            username:{type: String},
            userId:{type: String},
            bodyFat:{type: Number},
            weight:{type:Number}
        },
        client3:{
            comment:{type: String},
            username:{type: String},
            userId:{type: String},
            bodyFat:{type: Number},
            weight:{type:Number}
        },
        client4:{
            comment:{type: String},
            username:{type: String},
            userId:{type: String},
            bodyFat:{type: Number},
            weight:{type:Number}
        },
        client5:{
            comment:{type: String},
            username:{type: String},
            userId:{type: String},
            bodyFat:{type: Number},
            weight:{type:Number}
        },

    longitude:{type:Number},
    latitude:{type:Number},
    weight:{type:Number},
    height:{type:Number},
    bodyFat:{type:Number},
    hasGoneGym:{type:Number},
    gymOfChoice:{type:String}

});
//compare the password the user provided at the login to the password of the user
UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', UserSchema);