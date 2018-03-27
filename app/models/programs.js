var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var programSchema = new Schema({
    name: {type: String, lowercase:true, required: true},
    date:{type: Date, required: true},
    createdFor:{type: String, required: true},
    createdBy:{type: String,required: true},
    day1: {
        muscleGroup1: String,
        exercise1: String,
        sets1:  Number,
        reps1:  Number,
        restTime1:  Number,

        muscleGroup2: String,
        exercise2: String,
        sets2:  Number,
        reps2:  Number,
        restTime2:  Number,

        muscleGroup3: String,
        exercise3: String,
        sets3:  Number,
        reps3:  Number,
        restTime3:  Number,

        muscleGroup4: String,
        exercise4: String,
        sets4:  Number,
        reps4:  Number,
        restTime4:  Number,

        muscleGroup5: String,
        exercise5: String,
        sets5:  Number,
        reps5:  Number,
        restTime5:  Number
    },
    day2: {
        muscleGroup1: String,
        exercise1: String,
        sets1:  Number,
        reps1:  Number,
        restTime1:  Number,

        muscleGroup2: String,
        exercise2: String,
        sets2:  Number,
        reps2:  Number,
        restTime2:  Number,

        muscleGroup3: String,
        exercise3: String,
        sets3:  Number,
        reps3:  Number,
        restTime3:  Number,

        muscleGroup4: String,
        exercise4: String,
        sets4:  Number,
        reps4:  Number,
        restTime4:  Number,

        muscleGroup5: String,
        exercise5: String,
        sets5:  Number,
        reps5:  Number,
        restTime5:  Number
    },
    day3: {
        muscleGroup1: String,
        exercise1: String,
        sets1:  Number,
        reps1:  Number,
        restTime1:  Number,

        muscleGroup2: String,
        exercise2: String,
        sets2:  Number,
        reps2:  Number,
        restTime2:  Number,

        muscleGroup3: String,
        exercise3: String,
        sets3:  Number,
        reps3:  Number,
        restTime3:  Number,

        muscleGroup4: String,
        exercise4: String,
        sets4:  Number,
        reps4:  Number,
        restTime4:  Number,

        muscleGroup5: String,
        exercise5: String,
        sets5:  Number,
        reps5:  Number,
        restTime5:  Number
    },
    day4: {
        muscleGroup1: String,
        exercise1: String,
        sets1:  Number,
        reps1:  Number,
        restTime1:  Number,

        muscleGroup2: String,
        exercise2: String,
        sets2:  Number,
        reps2:  Number,
        restTime2:  Number,

        muscleGroup3: String,
        exercise3: String,
        sets3:  Number,
        reps3:  Number,
        restTime3:  Number,

        muscleGroup4: String,
        exercise4: String,
        sets4:  Number,
        reps4:  Number,
        restTime4:  Number,

        muscleGroup5: String,
        exercise5: String,
        sets5:  Number,
        reps5:  Number,
        restTime5:  Number
    }
});
module.exports = mongoose.model('Programs', programSchema);