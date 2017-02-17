import request from 'superagent';

const requestApi = 'http://localhost:3001/api/questions/';

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

class QuestionApi {
  static getAllQuestions() {
    return new Promise((resolve, reject) => {
      request
        .get(requestApi)
        .end(function(err, res){
          if(err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });

    });
  }

  static saveQuestion(data) {
    data = Object.assign({}, data); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      if (data._id) {
        request
          .put(requestApi+data._id)
          .send(data)
          .end(function (err, res) {
            if (err) {
              reject(err);
            } else {
              resolve(res.body);
            }
          });
      } else {
        request
          .post(requestApi)
          .send(data)
          .end(function (err, res) {
            if (err) {
              reject(err);
            } else {
              resolve(res.body);
            }
          });
      }
    });
  }

  static deleteQuestion(data) {
    data = Object.assign({}, data);
    return new Promise((resolve, reject) => {
      request
        .delete(requestApi+data._id)
        .send(data)
        .end(function(err, res){
          if(err) {
            reject(err);
          } else {
            resolve(res.req._data);
          }
        });
    });
  }
}

export default QuestionApi;
