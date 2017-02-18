import expect from 'expect';
import  React from 'react';
import {mount, shallow} from 'enzyme';
import QuestionForm from './QuestionForm';

function setUp(saving) {
  let props = {
    data: {},saving: saving, errors: {},
    onSave: () => {},
    onClick: () => {}

  };
  return shallow(<QuestionForm {...props}/>);
}

describe('Test Question Form', () => {

  it('renders form and h1 tag', ()=> {
    const wrapper = setUp();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Manage Question');
    expect(wrapper.find('.btn-primary') !== null).toBe(true);
  });

  it('save button is labelled save when not saving', ()=> {
    const wrapper = setUp(false);
    expect(wrapper.find('.btn-primary').props().value).toBe('Save');
  });

  it('save button is labelled Saving... when saving', ()=> {
    const wrapper = setUp(true);
    expect(wrapper.find('.btn-primary').props().value).toBe('Saving...');
  });


});
