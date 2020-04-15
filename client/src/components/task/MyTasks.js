import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import MyTasksTabs from './subs/MyTasksTabs';
import MyTasksTable from './subs/MyTasksTable';

class MyTasks extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: '1',
    };
  }

  onTabChange = (tab) => {
    if (tab !== this.state.selectedTab) this.setState({ selectedTab: tab });
  };

  render() {
    return (
      <React.Fragment>
        <div className='container mytasks-container'>
          <div className='mytasks-section'>
            <div className='task-list-title'>Your Added Tasks</div>
            <MyTasksTabs
              selectedTab={this.state.selectedTab}
              onTabChange={this.onTabChange}
            />
            <TabContent activeTab={this.state.selectedTab}>
              <TabPane tabId='1'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and are publicly
                      available.
                    </div>
                    <MyTasksTable />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='2'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and are currently
                      being done by some user.
                    </div>
                    <MyTasksTable />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='3'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and are currently
                      not available for proposals.
                    </div>
                    <MyTasksTable />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='4'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and are completed.
                      These tasks will not be available for further proposals.
                    </div>
                    <MyTasksTable />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='5'>
                <Row>
                  <Col sm='12'>
                    <div className='mt-2 mb-2 mytasks-note'>
                      Following are the tasks that you added and either you
                      removed them or the customer support deleted them from
                      Taskbarter.
                    </div>
                    <MyTasksTable />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(MyTasks);
