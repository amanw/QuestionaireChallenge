import expect from 'expect';
import  React from 'react';
import * as types from './actionTypes';
import  * as questionsActions from './questionsActions';
import thunk from 'redux-thunk';
import nock from 'nock';
import  configureMockStore from 'redux-mock-store';

describe('Test Question Actions', () => {
  it('createQuestionSuccess should create a CREATE_QUESTION_SUCCESS action', ()=> {
    const data= {question: '', answer: '', distractors: ''};
    const expectedAction = {
      type: types.CREATE_QUESTION_SUCCESS,
      question:data
    };

    const action = questionsActions.createQuestionSuccess(data);
    expect(action).toEqual(expectedAction);
  });

  it('updateQuestionSuccess should create a UPDATE_QUESTION_SUCCESS action', ()=> {
    const data= {question: '', answer: '', distractors: ''};
    const expectedAction = {
      type: types.UPDATE_QUESTION_SUCCESS,
      question:data
    };

    const action = questionsActions.updateQuestionSuccess(data);
    expect(action).toEqual(expectedAction);
  });

  it('loadQuestionsSuccess should create a LOAD_QUESTIONS_SUCCESS action', ()=> {
    const data= [];
    const expectedAction = {
      type: types.LOAD_QUESTIONS_SUCCESS,
      questions:data
    };

    const action = questionsActions.loadQuestionsSuccess(data);
    expect(action).toEqual(expectedAction);
  });
  it('deleteQuestionSuccess should create a DELETE_QUESTIONS_SUCCESS action', ()=> {
    const data= {question: '', answer: '', distractors: ''};
    const expectedAction = {
      type: types.DELETE_QUESTION_SUCCESS,
      question:data
    };

    const action = questionsActions.deleteQuestionSuccess(data);
    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and load questions when LOAD_QUESTIONS_SUCCESS', (done) => {
    //Example to nock
    nock('http://localhost:3001/api').get('/questions').reply(200, {body: {data: {id: '1',question: 'What?' }}})

    done();
  });
});
