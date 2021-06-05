const mongoose = require('mongoose')

// PPDT TEST SCHEMA
const ppdtSchema = new mongoose.Schema({
    email: String,
    username: String,
    picture: String,
    highscore: Number,
    count: Number,
    imagenumber: Number,
    answer: String,
    status: String
})

// Model for Second Type of Quiz Data 
const Second = mongoose.model("Second", ppdtSchema);

module.exports = Second