import React from 'react';
import {Link, IndexLink} from 'react-router';
import Loadable  from 'react-loading-animation';
const Header = ({loading, noOfQuestions}) => {
  return (
    <div id="header">
      <div id="nav">
        <ul>
          <li className="first">
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
          </li>
          <li>
            <IndexLink to="/questions" activeClassName="active">Questions ({noOfQuestions})</IndexLink>
          </li>
        </ul>
      </div>
      {loading && <div id="loading"><Loadable/></div>}
    </div>
  );
};

Header.propTypes ={
  loading: React.PropTypes.bool,
  noOfQuestions: React.PropTypes.number
};

export  default Header;
