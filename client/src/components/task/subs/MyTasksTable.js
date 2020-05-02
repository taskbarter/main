import React from 'react';
import { Table } from 'reactstrap';
import { compareSync } from 'bcryptjs';

const MyTasksTable = (props) => {
  const mytemptasks = props.tasks;

  const taskSection = () => {
    if (!mytemptasks) {
      return '';
    }
    console.log(mytemptasks);
    return mytemptasks.tasks_data.map((task, id) => (
      <tbody>
        <tr key={id}>
          <td scope='row' className='mytasks-date'>
            {new Date(task.date).toDateString()}
          </td>
          <td>I want someone to {task.headline}</td>
          <th>{task.taskpoints}</th>
          <td>
            <a href='#'>View ({task.proposals.length})</a>
          </td>
          <td>
            <a href='#'>Edit</a> | <a href='#'>Delete</a>
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
