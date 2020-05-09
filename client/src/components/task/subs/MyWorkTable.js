import React from 'react';
import { Table } from 'reactstrap';
import { compareSync } from 'bcryptjs';
import { Link } from 'react-router-dom';
import TLoader from '../../utils/TLoader';

const MyWorkTable = (props) => {
  const mytemptasks = props.tasks;

  const taskSection = () => {
    return mytemptasks.work_data.map((task, id) => (
      <tbody>
        <tr key={id}>
          <td scope='row' className='mytasks-date'>
            {new Date(task.taskDetails[0].date).toDateString()}
          </td>

          <Link className='clear-a' to={`/w/${task._id}`}>
            <td>
              <a href='#'>I want someone to {task.taskDetails[0].headline}</a>
            </td>
          </Link>

          <th>{task.taskDetails[0].taskpoints}</th>
          <td>{new Date(task.taskDetails[0].updatedAT).toDateString()}</td>
        </tr>
      </tbody>
    ));
  };
  console.log(mytemptasks);
  if (!mytemptasks) {
    return (
      <div className=''>
        <Table className='mytasks-table'>
          <thead>
            <tr>
              <th className='mytasks-date-h'>Date</th>
              <th>Title</th>
              <th>Points</th>
              <th>Updated</th>
            </tr>
          </thead>
        </Table>
        <div className='taskv-loader mx-auto' style={{ height: '20vh' }}>
          <TLoader colored={true} />
        </div>
      </div>
    );
  }
  if (mytemptasks.work_data.length == 0) {
    return (
      <div className=''>
        <Table className='mytasks-table'>
          <thead>
            <tr>
              <th className='mytasks-date-h'>Date</th>
              <th>Title</th>
              <th>Points</th>
              <th>Updated</th>
            </tr>
          </thead>
        </Table>
        <div className=' mx-auto'>No Tasks Available</div>
      </div>
    );
  }
  return (
    <div className=''>
      <Table className='mytasks-table'>
        <thead>
          <tr>
            <th className='mytasks-date-h'>Date</th>
            <th>Title</th>
            <th>Points</th>
            <th>Updated</th>
          </tr>
        </thead>
        {taskSection()}
      </Table>
    </div>
  );
};

export default MyWorkTable;
