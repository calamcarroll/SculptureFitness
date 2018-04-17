var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var gymSchema = new Schema({
    name: {type: String, lowercase:true, required: true, unique:true},
    monthlyPrice: {type: Number, required: true},
    threeMonthPrice: {type: Number, required: true},
    yearPrice: {type: Number, required: true},
    email: {type: String, required: true, lowercase: true, unique:true},
    website: {type: String, required: true},
    profileImg: { type: String },
    location: {
        longitude: Number,
        latitude:  Number
    }
});
module.exports = mongoose.model('Gyms', gymSchema);