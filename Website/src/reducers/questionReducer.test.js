import expect from 'expect';
import  React from 'react';
import  questionReducer from './questionReducer';
import  * as questionActions from '../actions/questionsActions';

describe('Test Question Reducer', () => {
  it('should add question when passed CREATE_QUESTION_SUCCESS', ()=> {
    const intialState =[
      {question: "what?"},
      {question: "who?"}
    ]

    const newQuestion = {question: "when?"};

    const action =questionActions.createQuestionSuccess(newQuestion);

    const newState = questionReducer(intialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].question).toEqual('what?');
    expect(newState[1].question).toEqual('who?');
    expect(newState[2].question).toEqual('when?');
  });
  it('should update question when passed UPDATE_QUESTION_SUCCESS', ()=> {
    const intialState =[
      {_id:'1', question: "what?"},
      {_id:'2', question: "who?"},
      {_id:'3', question: "when?"}
    ]

    const newQuestion = {_id:'3', question: "where?"};

    const action =questionActions.updateQuestionSuccess(newQuestion);

    const newState = questionReducer(intialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].question).toEqual('what?');
    expect(newState[1].question).toEqual('who?');
    expect(newState[2].question).toEqual('where?');
  });
});

