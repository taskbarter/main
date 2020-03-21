import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getCurrentProfile,
  updateProfile,
  updateStatus,
  addExperience
} from '../../actions/profileAction';
import '../../style/profile/profile_page.css';
import FirstBlock from './subs/FirstBlock';
import SecondBlock from './subs/SecondBlock';
import ThirdBlock from './subs/ThirdBlock';
import StatusBlock from './subs/StatusBlock';
import SkillsBlock from './subs/SkillsBlock';
import LinksBlock from './subs/LinksBlock';
import EditFirst from './edit/EditFirst';
import AddSecond from './edit/AddSecond';

class Me extends Component {
  constructor(props) {
    super();
    this.state = {
      isFirstEditDialogOpenned: false,
      isSecondAddDialogOpenned: false,
      current_dob: new Date('October 4, 1997 11:13:00'),
      isCurrentlyWorking: false,
      current_from: new Date('October 4, 2019 11:13:00'),
      current_to: new Date()
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  toggleCurrentlyWorking = () => {
    const tempCur = this.state.isCurrentlyWorking;
    this.setState({
      isCurrentlyWorking: !tempCur
    });
  };

  openFirstModal = () => {
    this.setState({
      isFirstEditDialogOpenned: true,
      current_dob: new Date(this.props.profile.profile.dob)
    });
  };

  addSecondModal = () => {
    this.setState({
      isSecondAddDialogOpenned: true
    });
  };

  onProfileUpdateSecond = data => {
    this.props.addExperience(data);
    this.closeSecondAddDialog();
  };

  closeFirstEditDialog = () => {
    this.setState({ isFirstEditDialogOpenned: false });
  };

  closeSecondAddDialog = () => {
    this.setState({ isSecondAddDialogOpenned: false });
  };

  onDoBChange = d => {
    this.setState({
      current_dob: d
    });
  };

  onFromChanged = d => {
    this.setState({
      current_from: d
    });
  };

  onToChanged = d => {
    this.setState({
      current_to: d
    });
  };

  onProfileUpdateFirst = payload => {
    this.props.updateProfile(payload);
    this.closeFirstEditDialog();
  };

  onStatusChange = s => {
    console.log('new status', s);
    this.props.updateStatus(s);
  };

  render() {
    const profile = this.props.profile.profile;
    const user = this.props.user;
    const { isFirstEditDialogOpenned, current_dob } = this.state;
    return (
      <div>
        <main role='main' className='container mt-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2'>
              <StatusBlock
                changeStatus={this.onStatusChange}
                profile={profile}
              />
              <SkillsBlock profile={profile} />
              <LinksBlock profile={profile} />
            </div>
            <div className='col-md-8 order-md-1'>
              <FirstBlock
                editModal={this.openFirstModal}
                profile={profile}
                user={user}
              />
              <SecondBlock addModal={this.addSecondModal} profile={profile} />
              <ThirdBlock profile={profile} />
            </div>
          </div>
        </main>
        <EditFirst
          modalIsOpen={isFirstEditDialogOpenned}
          closeModal={this.closeFirstEditDialog}
          profile={profile}
          onDoBChange={this.onDoBChange}
          current_dob={current_dob}
          submitForm={this.onProfileUpdateFirst}
        />

        <AddSecond
          modalIsOpen={this.state.isSecondAddDialogOpenned}
          closeModal={this.closeSecondAddDialog}
          profile={profile}
          submitForm={this.onProfileUpdateSecond}
          toggleCurrentlyWorking={this.toggleCurrentlyWorking}
          isCurrentlyWorking={this.state.isCurrentlyWorking}
          currentFrom={this.state.current_from}
          currentTo={this.state.current_to}
          onFromChanged={this.onFromChanged}
          onToChanged={this.onToChanged}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  updateProfile,
  updateStatus,
  addExperience
})(Me);
