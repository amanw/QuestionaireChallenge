import expect from 'expect';
import  React from 'react';
import {mount, shallow} from 'enzyme';
import {ManageQuestionPage} from './ManageQuestionPage';

describe('Test Question Page', () => {
  it('sets error message when trying to save with empty question', ()=> {
    const props = {
      actions: {saveQuestion: () => {return Promise.resolve();}},
      data: {question: '', answer: '', distractors: ''}
    }
    const wrapper = mount(<ManageQuestionPage {...props}/>);
    const saveBtn = wrapper.find('.btn-primary').last();
    expect(saveBtn.prop('type')).toBe('submit');
    saveBtn.simulate('click');
    expect(wrapper.state().errors.question).toBe('Question cannot be empty.');
  });
  it('sets error message when trying to save with question without \'?\'', ()=> {
    const props = {
      actions: {saveQuestion: () => {return Promise.resolve();}},
      data: {question: 'What', answer: '', distractors: ''}
    }
    const wrapper = mount(<ManageQuestionPage {...props}/>);
    const saveBtn = wrapper.find('.btn-primary').last();
    expect(saveBtn.prop('type')).toBe('submit');
    saveBtn.simulate('click');
    expect(wrapper.state().errors.question).toBe('Question should be ending with \'?\'');
  });
  it('sets error message when trying to save with answer empty', ()=> {
    const props = {
      actions: {saveQuestion: () => {return Promise.resolve();}},
      data: {question: 'What?', answer: '', distractors: ''}
    }
    const wrapper = mount(<ManageQuestionPage {...props}/>);
    const saveBtn = wrapper.find('.btn-primary').last();
    expect(saveBtn.prop('type')).toBe('submit');
    saveBtn.simulate('click');
    expect(wrapper.state().errors.answer).toBe('Answer cannot be empty');
  });
});
