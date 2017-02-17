var express = require('express');

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
                    var questionModel = new data(requestBody);
                    console.log(questionModel);
                    questionModel.save();
                    res.status(201).send(questionModel);
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
                        res.status(201).send(req.question);
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
                req.question.save(function (err) {
                    if(err){
                        res.status(500).send(err);
                    } else {
                        res.status(201).send(req.question);
                    }
                });
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