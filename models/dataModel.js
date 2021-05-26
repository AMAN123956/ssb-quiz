const mongoose = require('mongoose')


// Data Schema for General Data
const dataSchema = new mongoose.Schema({
    email: String,
    username: String,
    picture: String,
    firstHighScore: String,
    firstCount: Number,
    secondHighScore: Number,
    secondCount: Number,
    thirdHighScore: Number,
    thirdCount: Number
})
  

// Model for General  Quiz Data 
const Data = mongoose.model("Data", dataSchema);

module.exports = Data