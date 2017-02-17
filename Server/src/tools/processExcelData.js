var csv = require("fast-csv");

var readCsv = function (data) {
    csv.fromPath("./src/data/code_challenge_question_dump.csv")
        .on("data", function (excelData) {
            var dataArray = excelData.toString().split('|');
            var jsonData = {};
            jsonData.question = dataArray[0];
            jsonData.answer = dataArray[1];
            jsonData.distractors = dataArray[2];
            var questionModel = new data(jsonData);
            questionModel.save();
        })
        .on("end", function () {
            console.log("done");
        });
};

module.exports = readCsv;
