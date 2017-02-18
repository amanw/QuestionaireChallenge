import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import  {bindActionCreators} from 'redux';
import * as questionsActions from '../../actions/questionsActions';
import QuestionForm from './QuestionForm';
import toastr from 'toastr';
import  math from 'mathjs';

export class ManageQuestionPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: Object.assign({}, this.props.data),
      errors: {},
      saving: false
    };
    this.updateQuestionState = this.updateQuestionState.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.redirect = this.redirect.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.data._id != nextProps.data._id){
      this.setState({data: Object.assign({},  nextProps.data)});
    }
  }

  updateQuestionState(event){
    const field = event.target.name;
    let data = this.state.data;
    data[field] = event.target.value;
    return this.setState({data: data});
  }

  questionFormIsValid() {
    const isQuestion = new RegExp("(\\?)$");
    const hasMath = new RegExp("(\\d+)");
    const isNotValidAnswer = new RegExp("([aA-zZ]+)");
    let errors = {};
    let formIsValid = true;
    const data= this.state.data;
    if(data.question.length == 0 || data.question.length < 5) {
      errors.question = "Question must be 5 characters";
      formIsValid = false;
    }
    if(!isQuestion.test(data.question)) {
      errors.question = "Question should be ending with '?'";
      formIsValid = false;
    }
    if(!hasMath.test(data.question)) {
      errors.answer = "Question should contain numeric mathematical expression?";
      formIsValid = false;
    }
    if(data.answer.length == 0 ) {
      errors.answer = "Answer cannot be empty";
      formIsValid = false;
    }
    console.log(isNotValidAnswer.exec(data.answer));
    if(isNotValidAnswer.test(data.answer)) {
      errors.answer = "Answer should be a numeric only";
      formIsValid = false;
    }
    this.setState({errors:errors});
    return formIsValid;
  }

  saveQuestion(event) {
    event.preventDefault();
    if(!this.questionFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    this.props.actions.saveQuestion(this.state.data)
      .then(() => this.redirect())
      .catch((err) => {
        toastr.error(err);
        this.setState({saving: false});
      });

  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Question Saved');
    this.context.router.push('/questions');
  }

  onCancel() {
    this.context.router.push('/questions');
  }
  render() {
    return (
      <QuestionForm
        data ={this.state.data}
        errors = {this.state.errors}
        onChange={this.updateQuestionState}
        onSave={this.saveQuestion}
        saving={this.state.saving}
        onCancel={this.onCancel}/>
    );
  }
}

ManageQuestionPage.propTypes = {
  data : PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageQuestionPage.contextTypes = {
  router: PropTypes.object
};

function getQuestionById(questions, questionId) {
  const questList = questions.filter((question) => question._id === questionId);
  return questList ? questList[0] : null;
}

function mapStateToProps(state, ownProps) {
  let questionId = ownProps.params.id;
  let data = {question: '', answer: '', distractors: ''};
  if(questionId && state.questions.length > 0) {
    data = getQuestionById(state.questions, questionId);
  }
  return {
    data: data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageQuestionPage);
