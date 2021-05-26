const mongoose = require('mongoose')

// Quiz Schema Schema */
const quizSchema = new mongoose.Schema({
    email: String,
    username: String,
    picture: String,
    highscore: Number,
    count: Number
})

// Model for First == Final where we have plot graph all other test are for practice Type of Quiz Data 
const First = mongoose.model("First", quizSchema);
// Model for Third Type of Quiz
const Third = mongoose.model("Third", quizSchema);
// OIRTEST ONE NEWBIE
const OirTestOne = mongoose.model("OirTestOne", quizSchema);
// OIR TEST TWO BEGINNER
const OirTestTwo = mongoose.model("OirTestTwo", quizSchema);
// OIR TEST THREE
const OirTestThree = mongoose.model("OirTestThree", quizSchema);
// OIR TEST FOUR
const OirTestFour = mongoose.model("OirTestFour", quizSchema);
// OIR TEST FIVE
const OirTestFive = mongoose.model("OirTestFive", quizSchema);

module.exports =
    { First,Third,OirTestOne, OirTestTwo, OirTestThree, OirTestFour, OirTestFive }
