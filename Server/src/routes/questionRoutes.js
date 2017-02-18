var express = require('express');

function verifyQuestion(data) {
    let errors = '';
    const isQuestion = new RegExp("(\\?)$");
    const hasMath = new RegExp("(\\d+)");
    const isNotValidAnswer = new RegExp("([aA-zZ]+)");
    if(data.question.length == 0) {
        errors = errors + ", " + "Question cannot be empty.";
    } else if(!isQuestion.test(data.question)) {
        errors = errors +  ", " + "Question should be ending with '?'";
    } else if(!hasMath.test(data.question)) {
        errors = errors +  ", " + "Question should contain numeric mathematical expression?";
    }
    if(data.answer.length == 0 ) {
        errors = errors +  ", " + "Answer cannot be empty";
    } else if(isNotValidAnswer.test(data.answer)) {
        errors = errors +  ", " +"Answer should be a numeric only";
    }
    return errors;
}

var routes = function (data) {

    var questionRouter = express.Router();

    questionRouter.route('/')
        .post(function(req, res) {
            var body = [];
            req.on('data', function (chunk) {
               body.push(chunk);
            }).on('end', function() {
                var requestBody = JSON.parse(Buffer.concat(body).toString());
                if(requestBody) {
                    data.find({question: requestBody.question}, function(err, question){
                       if (question.length > 0) {
                           res.status(400).send('Question already existing!!');
                       } else {
                           var err = verifyQuestion(requestBody);
                           if(err) {
                               res.status(400).send(err);
                           } else {
                               var questionModel = new data(requestBody);
                               questionModel.save();
                               res.status(201).send(questionModel);
                           }
                       }
                    });
                } else
                {
                    res.status(400).send('Bad Request: Did not find response in body');
                }
            });

        })
        .get(function(req, res){
            data.find(req.query, function(err, questions){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(questions);
                }
            });
        });
    questionRouter.use('/:id', function (req, res, next) {
        data.findById(req.params.id, function(err, question){
            if(err){
                res.status(500).send(err);
            } else if(question) {
                req.question = question;
                next();
            }else {

                res.status(404).send('No question found');
            }
        });
    });
    questionRouter.route('/:id')
        .get(function(req, res){
            res.json(req.question);
        })
        .put(function(req, res){
            var body = [];
            req.on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function() {
                var requestBody = JSON.parse(Buffer.concat(body).toString());
                req.question.question = requestBody.question;
                req.question.answer  =  requestBody.answer;
                req.question.distractors  =  requestBody.distractors;
                req.question.save(function (err) {
                    if(err){
                        res.status(500).send(err);
                    } else {
                        var er = verifyQuestion(req.question);
                        if(er) {
                            res.status(400).send(err);
                        } else {
                            var questionModel = new data(requestBody);
                            questionModel.save();
                            res.status(201).send(questionModel);
                        }
                    }
                });
            });

        })
        .patch(function (req, res) {
            var body = [];
            req.on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function() {
                var requestBody = JSON.parse(Buffer.concat(body).toString());
                if(requestBody._id)
                    delete requestBody._id;
                for (var p in requestBody) {
                    req.question[p] = requestBody[p];
                }
                var er = verifyQuestion(req.question);
                if(er) {
                    res.status(400).send(err);
                } else {
                    req.question.save(function (err) {
                        if(err){
                            res.status(500).send(err);
                        } else {
                            res.status(201).send(req.question);
                        }
                    });
                }

            });
        })
        .delete(function (req, res) {
            req.question.remove(function (err) {
                if(err){
                    res.status(500).send(err);
                } else {
                   res.status(204).send(req.question);
                }
            });
        });
return questionRouter;
};

module.exports = routes;