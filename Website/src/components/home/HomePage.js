import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import  {bindActionCreators} from 'redux';
import * as questionsActions from '../../actions/questionsActions';
import 'react-table/react-table.css';
import QuestionList from './QuestionList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class QuestionsPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.redirectToAddQuestionPage = this.redirectToAddQuestionPage.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  deleteQuestion(evt) {
    this.props.actions.deleteQuestion(evt.target.value)
      .then(() => this.redirect())
      .catch((err) => {
        console('err', err);
        toastr.error(err);
      });

  }

  redirect() {
    toastr.success('Deleted Question');
    this.context.router.push('/questions');
  }

  redirectToAddQuestionPage(){
    browserHistory.push('/question');
  }

  render () {
      const {questions} = this.props;
        return (
          <div id="main">
            <div id="content">
                <h1>List of Questions</h1>
              <input
                type="submit"
                value="Add Question"
                className="btn btn-primary"
                onClick={this.redirectToAddQuestionPage}/>
              <QuestionList questions={questions} onDelete={this.deleteQuestion}/>
            </div>
          </div>
        );

    }
}

QuestionsPage.propTypes = {
  questions : PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

QuestionsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps (state, ownProps) {
  return {
    questions: state.questions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (QuestionsPage);
