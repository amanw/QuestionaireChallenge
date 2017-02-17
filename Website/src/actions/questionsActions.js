import  * as types from './actionTypes';
import questionApi from '../api/questionApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadQuestionsSuccess(questions) {
  return { type: types.LOAD_QUESTIONS_SUCCESS, questions };
}

export function createQuestionSuccess(question) {
  return { type: types.CREATE_QUESTION_SUCCESS, question };
}

export function updateQuestionSuccess(question) {
  return { type: types.UPDATE_QUESTION_SUCCESS, question };
}
export function deleteQuestionSuccess(question) {
  return { type: types.DELETE_QUESTION_SUCCESS, question };
}

export function loadQuestions() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return questionApi.getAllQuestions().then(questions => {
      dispatch(loadQuestionsSuccess(questions));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw (error);
    });
  };
}

export function saveQuestion(data) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return questionApi.saveQuestion(data).then(savedQuestion => {
      data._id ? dispatch(updateQuestionSuccess(savedQuestion)):
        dispatch(createQuestionSuccess(savedQuestion));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw (error);
    });
  };
}

export function deleteQuestion(question) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return questionApi.deleteQuestion(question).then(question => {
        dispatch(deleteQuestionSuccess(question));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw (error);
    });
  };
}
