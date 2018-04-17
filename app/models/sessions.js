var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var gymSessions = new Schema({
    longitude: {type: String, required: true},
    latitude: {type: String, required: true},
    timeSpent: {type: Number},
    date:{type: Date},
    username:{type: String},
    bodyFat:{type:Number},
    weight:{type:Number},
    userId:{type: String},
    hasGoneGym:{type:Number}

});
module.exports = mongoose.model('Sessions', gymSessions);