import React from 'react';
import classnames from 'classnames';
import { Nav, NavItem, NavLink } from 'reactstrap';

const MyWorkTabs = (props) => {
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
          Current
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
          Completed
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default MyWorkTabs;
