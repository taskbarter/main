import React from 'react';
import { Table } from 'reactstrap';

const MyTasksTable = (props) => {
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
        <tbody>
          <tr>
            <td scope='row' className='mytasks-date'>
              6th June
            </td>
            <td>I want someone to write a new cover letter for me</td>
            <th>65</th>
            <td>
              <a href='#'>View (5)</a>
            </td>
            <td>
              <a href='#'>Edit</a> | <a href='#'>Delete</a>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default MyTasksTable;
