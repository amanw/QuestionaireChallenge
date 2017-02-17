var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    readCsv = require('./tools/processExcelData');

var db = mongoose.connect('mongodb://localhost:27017/questions');
var Question = require('./models/questionModel');
var app = express();

var port = process.env.PORT || 3001;


var questionRouter = require('./routes/questionRoutes')(Question);

app.use('/api/Questions', questionRouter);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.json('Weloome to Question API');
});

var server = app.listen(port, function () {
    Question.find(function(err, questions){
        console.log(questions.length);
        if(err){
            console.log('Db Error Initializing ', err);
        } else if(questions && questions.length < 10){
            readCsv(Question);
        }
    });
    console.log('server is up in running at http://localhost:' + server.address().port + '/notes');

})
