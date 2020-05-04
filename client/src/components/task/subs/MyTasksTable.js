import React from 'react';
import { Table } from 'reactstrap';
import { compareSync } from 'bcryptjs';
import { Link } from 'react-router-dom';
import TLoader from '../../utils/TLoader';

const MyTasksTable = (props) => {
  const mytemptasks = props.tasks;

  const taskSection = () => {
    if (!mytemptasks) {
      return (
        <div className='taskv-loader mx-auto' style={{ height: '20vh' }}>
          <TLoader colored={true} />
        </div>
      );
    }
    if (mytemptasks.tasks_data.length == 0) {
      return <div className='mx-auto'>No Tasks Available</div>;
    }
    console.log(mytemptasks);
    return mytemptasks.tasks_data.map((task, id) => (
      <tbody>
        <tr key={id}>
          <td scope='row' className='mytasks-date'>
            {new Date(task.date).toDateString()}
          </td>
          <Link className='clear-a' to={`/t/${task._id}`}>
            <td>
              <a href='#'>I want someone to {task.headline}</a>
            </td>
          </Link>
          <th>{task.taskpoints}</th>
          <td>
            <a href='#' onClick={() => props.setProposal(task)}>
              View ({task.proposals ? task.proposals.length : 0})
            </a>
          </td>
          <td>
            <Link to='/add'>
              <a href='#'>Edit</a>
            </Link>{' '}
            |{' '}
            <a href='#' onClick={() => props.onDeleteTask(task._id)}>
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    ));
  };
  return (
    <div className=''>
      <Table className='mytasks-table'>
        <thead>
          <tr>
            <th className='mytasks-date-h'>Date</th>
            <th>Title</th>
            <th>Points</th>
            <th>Proposals</th>
            <th>Actions</th>
          </tr>
        </thead>
        {taskSection()}
      </Table>
    </div>
  );
};

export default MyTasksTable;
