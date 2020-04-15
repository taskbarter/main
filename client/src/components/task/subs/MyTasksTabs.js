import React from 'react';
import classnames from 'classnames';
import { Nav, NavItem, NavLink } from 'reactstrap';

const MyTasksTabs = (props) => {
  return (
    <Nav tabs className='mytasks-tabs'>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.selectedTab === '1',
          })}
          onClick={() => {
            props.onTabChange('1');
          }}
        >
          Available
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.selectedTab === '2',
          })}
          onClick={() => {
            props.onTabChange('2');
          }}
        >
          Assigned
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.selectedTab === '3',
          })}
          onClick={() => {
            props.onTabChange('3');
          }}
        >
          Paused
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.selectedTab === '4',
          })}
          onClick={() => {
            props.onTabChange('4');
          }}
        >
          Completed
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: props.selectedTab === '5',
          })}
          onClick={() => {
            props.onTabChange('5');
          }}
        >
          Archived
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default MyTasksTabs;
