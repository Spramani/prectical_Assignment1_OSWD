const mongoose = require('mongoose');

let studentscheme = new mongoose.Schema({
    name : String,
    department : String,
    year : Number
});

module.exports = mongoose.model('student', studentscheme);