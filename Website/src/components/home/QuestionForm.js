import React from 'react';
import TextInput from '../common/TextInput';

const QuestionForm = ({data, onSave, onChange, saving, errors}) =>{
  return(
    <form>
      <h1>Manage Question</h1>
      <TextInput
        name="question"
        label="Question"
        value={data.question}
        onChange={onChange}
        error={errors.question}/>
      <TextInput
        name="answer"
        label="Answer"
        value={data.answer}
        onChange={onChange}
        error={errors.answer}/>
      <TextInput
        name="distractors"
        label="Distractors"
        value={data['distractors']}
        onChange={onChange}
        error={errors.distractors}/>
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};


QuestionForm.propTypes = {
  data: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default QuestionForm;
