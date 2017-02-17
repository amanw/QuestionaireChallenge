import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import  ManageQuestionPage from './components/home/ManageQuestionPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="questions" component={HomePage}/>
    <Route path="deleteQuestion/:id" component={HomePage}/>
    <Route path="question" component={ManageQuestionPage}/>
    <Route path="question/:id" component={ManageQuestionPage}/>
  </Route>
);
