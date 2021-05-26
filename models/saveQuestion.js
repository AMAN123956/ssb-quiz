const mongoose = require('mongoose')
const { model } = require('./dataModel')

// Question Save Schema 
const savequestionSchema = new mongoose.Schema({
    question: String,
    firstOption: String,
    secondOption: String,
    thirdOption: String,
    fourthOption: String,
    correctAnswer: String
})
  
// Model to save Questions for OIR TEST
const Question = mongoose.model("Question", savequestionSchema);

module.exports = Question