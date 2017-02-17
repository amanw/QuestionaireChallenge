import  * as types from '../actions/actionTypes';
import initialState from './initialState';
export  default  function questionReducer(state = initialState.questions, action) {
  switch (action.type) {
    case types.CREATE_QUESTION_SUCCESS: {
      return [...state,
        Object.assign({}, action.question)
      ];
    }
    case types.UPDATE_QUESTION_SUCCESS: {
      return [...state.filter((data) => data._id !== action.question._id),
        Object.assign({}, action.question)
      ];
    }
    case types.DELETE_QUESTION_SUCCESS:
    {
      return [...state.filter((data) => data._id !== action.question._id)];
    }
    case types.LOAD_QUESTIONS_SUCCESS:
      return action.questions;
    default:
      return state;
  }
}
