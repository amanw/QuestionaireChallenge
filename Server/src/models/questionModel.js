var mongoose = require('mongoose');

var  questionSchema =  mongoose.Schema({
    question: String,
    answer: String,
    distractors: String
});

var Question = mongoose.model("Question", questionSchema);

module.exports =  Question;