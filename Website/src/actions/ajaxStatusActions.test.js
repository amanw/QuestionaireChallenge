import expect from 'expect';
import  React from 'react';
import * as types from './actionTypes';
import  * as ajaxActions from './ajaxStatusActions';
describe('Test Ajax Actions', () => {
  it('ajaxCallError should create a AJAX_CALL_ERROR action', ()=> {
    const expectedAction = {
      type: types.AJAX_CALL_ERROR,
    };
    const action = ajaxActions.ajaxCallError();
    expect(action).toEqual(expectedAction);
  });
  it('beginAjaxCall should create a BEGIN_AJAX_CALL action', ()=> {
    const expectedAction = {
      type: types.BEGIN_AJAX_CALL,
    };
    const action = ajaxActions.beginAjaxCall();
    expect(action).toEqual(expectedAction);
  });
});
