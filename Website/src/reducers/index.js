import {combineReducers} from 'redux';
import questions from './questionReducer';
import ajaxCallInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  questions,
  ajaxCallInProgress
});

export default rootReducer;
