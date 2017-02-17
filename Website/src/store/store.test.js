import expect from 'expect';
import rootReducer from '../reducers';
import  {createStore} from 'redux';
import initialState from '../reducers/initialState';
import * as questionActions from '../actions/questionsActions';

describe('Test Store', () => {
  it('should handle creating questions', () => {
    const store = createStore(rootReducer, initialState);
    const  data = {
      question: 'what?'
    };
    const action = questionActions.createQuestionSuccess(data);
    store.dispatch(action);
    const actual = store.getState().questions[0];
    expect(actual).toEqual(data);
  });
  it('should handle updating questions', () => {
    initialState.questions.push({
      id: '1',
      question: 'what?'
    });
    const store = createStore(rootReducer, initialState);
    const newData = {
      id:'1',
      question: 'When?'
    };
    const action = questionActions.updateQuestionSuccess(newData);
    store.dispatch(action);
    const actual = store.getState().questions[0];
    expect(actual).toEqual(newData);
  });
  it('should handle deleting questions', () => {
    initialState.questions.push({
      id: '1',
      question: 'what?'
    },{
      id: '2',
      question: 'when?'
    });
    const store = createStore(rootReducer, initialState);
    const newData = {
      id:'1',
      question: 'what?'
    };
    const action = questionActions.deleteQuestionSuccess(newData);
    store.dispatch(action);
    const actual = store.getState().questions;
    console.log(actual);
  });
});
