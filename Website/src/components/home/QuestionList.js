import React, {PropTypes} from 'react';
import ReactTable from 'react-table';
import {Link} from 'react-router';

const QuestionList = ({questions, onDelete}) => {
  const columns =  [{
    header: 'Question',
    accessor: 'question', // String-based value accessors !
    className: 'tableLink',
    render: row => {
      console.log(row.row);
      return <Link to={'/question/' + row.row._id}>{row.row.question}</Link>;
    }
  },{
    header: 'Action',
    accessor: 'action', // String-based value accessors !
    render: row => {
      return (<a value={row.row} onClick={onDelete} className="btn btn-primary btn-danger deleteTableBtn">Delete</a>);
    }
  }];
  return (<div>
      <link rel="stylesheet" href="node_modules/react-table/react-table.css"/>
      <ReactTable
        className="table"
        data={questions}
        columns={columns}
        defaultPageSize={10}
        minRows={3}
      />
  </div>);
};

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default QuestionList;
