import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getCurrentProfile,
  updateProfile,
  updateStatus,
  addExperience,
  editExperience,
  deleteExperience,
  deleteProject,
  editProjects,
  addProject,
  addSkill,
  addLink,
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
import EditSecond from './edit/EditSecond';
import AddThird from './edit/AddThird';
import EditThird from './edit/EditThird';
import AddSkills from './edit/AddSkills';
import DeleteSkills from './edit/DeleteSkills';
import AddLinks from './edit/AddLinks';

class Me extends Component {
  constructor(props) {
    super();
    this.state = {
      isFirstEditDialogOpenned: false,
      isSecondAddDialogOpenned: false,
      isSecondEditDialogOpenned: false,
      isThirdAddDialogOpenned: false,
      isThirdEditDialogOpenned: false,
      isSkillAddDialogOpenned: false,
      isSkillDeleteDialogOpenned: false,
      isLinkAddDialogOpenned: false,
      current_dob: new Date('October 4, 1997 11:13:00'),
      isCurrentlyWorking: false,
      current_from: new Date('October 4, 2019 11:13:00'),
      current_to: new Date(),
      selectedIndex: 0,
      tempSkills: [],
    };
  }

  deleteSKillFunc = (i) => {
    this.state.tempSkills.splice(i, 1);
    const temp = this.state.tempSkills;
    this.setState({ tempSkills: temp });
    // alert('delete ' + i);
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  toggleCurrentlyWorking = () => {
    const tempCur = this.state.isCurrentlyWorking;
    this.setState({
      isCurrentlyWorking: !tempCur,
    });
  };

  openFirstModal = () => {
    if (!isNaN(this.props.profile.profile.dob)) {
      this.setState({
        isFirstEditDialogOpenned: true,
        current_dob: new Date(this.props.profile.profile.dob),
      });
    } else {
      this.setState({
        isFirstEditDialogOpenned: true,
      });
    }
  };

  secondEditToggle = () => {
    this.setState({
      isSecondEditDialogOpenned: true,
    });
  };

  editSecondModal = (index) => {
    this.setState({ selectedIndex: index }, () => {
      this.secondEditToggle();
    });
  };

  deleteSecondModal = (index) => {
    this.setState({ selectedIndex: index }, () => {
      this.onProfileDeleteSecond();
    });
  };

  onProfileDeleteSecond = () => {
    this.props.deleteExperience(this.state.selectedIndex);
  };

  deleteThirdModal = (index) => {
    this.setState({ selectedIndex: index }, () => {
      this.onProfileDeleteThird();
    });
  };

  onProfileDeleteThird = () => {
    this.props.deleteProject(this.state.selectedIndex);
  };

  thirdEditToggle = () => {
    this.setState({
      isThirdEditDialogOpenned: true,
    });
  };

  editThirdModal = (index) => {
    this.setState({ selectedIndex: index }, () => {
      this.thirdEditToggle();
    });
  };

  addSecondModal = () => {
    this.setState({
      isSecondAddDialogOpenned: true,
    });
  };

  addThirdModal = () => {
    this.setState({
      isThirdAddDialogOpenned: true,
    });
  };

  addSkillModal = () => {
    this.setState({
      isSkillAddDialogOpenned: true,
    });
  };

  deleteSkillModal = (skills) => {
    this.setState({
      isSkillDeleteDialogOpenned: true,
    });
    console.log(skills);
  };

  setTempSkills = (skills) => {
    this.setState({
      tempSkills: skills,
    });
  };

  addLinkModal = () => {
    this.setState({
      isLinkAddDialogOpenned: true,
    });
  };

  onProfileUpdateSecond = (data) => {
    this.props.addExperience(data);
    this.closeSecondAddDialog();
  };

  onProfileEditSecond = (data) => {
    this.props.editExperience(data, this.state.selectedIndex);
    this.closeSecondEditDialog();
  };

  onProfileUpdateThird = (data) => {
    this.props.addProject(data);
    this.closeThirdAddDialog();
  };

  onProfileEditThird = (data) => {
    this.props.editProjects(data, this.state.selectedIndex);
    this.closeThirdEditDialog();
  };

  onProfileUpdateSkill = (data) => {
    this.props.addSkill(data);
    this.closeSkillAddDialog();
  };

  onProfileDeleteSkill = () => {
    // this.props.addSkill(data);
    this.closeSkillDeleteDialog();
    // alert('Closing the skill dialog box from submit');
  };

  onProfileUpdateLink = (data) => {
    this.props.addLink(data);
    this.closeLinkAddDialog();
  };

  closeFirstEditDialog = () => {
    this.setState({ isFirstEditDialogOpenned: false });
  };

  closeSecondAddDialog = () => {
    this.setState({ isSecondAddDialogOpenned: false });
  };

  closeSecondEditDialog = () => {
    this.setState({ isSecondEditDialogOpenned: false });
  };

  closeThirdAddDialog = () => {
    this.setState({ isThirdAddDialogOpenned: false });
  };

  closeThirdEditDialog = () => {
    this.setState({ isThirdEditDialogOpenned: false });
  };

  closeSkillAddDialog = () => {
    this.setState({ isSkillAddDialogOpenned: false });
  };

  closeSkillDeleteDialog = () => {
    this.setState({ isSkillDeleteDialogOpenned: false });
    // alert('Closing the skill dialog box from close');
  };

  closeLinkAddDialog = () => {
    this.setState({ isLinkAddDialogOpenned: false });
  };

  onDoBChange = (d) => {
    this.setState({
      current_dob: d,
    });
  };

  onFromChanged = (d) => {
    this.setState({
      current_from: d,
    });
  };

  onToChanged = (d) => {
    this.setState({
      current_to: d,
    });
  };

  onProfileUpdateFirst = (payload) => {
    this.props.updateProfile(payload);
    this.closeFirstEditDialog();
  };

  onStatusChange = (s) => {
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
              <SkillsBlock
                addModal={this.addSkillModal}
                deleteModal={this.deleteSkillModal}
                profile={profile}
              />
              <LinksBlock addModal={this.addLinkModal} profile={profile} />
            </div>
            <div className='col-md-8 order-md-1'>
              <FirstBlock
                editModal={this.openFirstModal}
                profile={profile}
                user={user}
              />
              <SecondBlock
                addModal={this.addSecondModal}
                editModal={this.editSecondModal}
                deleteModal={this.deleteSecondModal}
                profile={profile}
                user={user}
              />
              <ThirdBlock
                addModal={this.addThirdModal}
                editModal={this.editThirdModal}
                deleteModal={this.deleteThirdModal}
                profile={profile}
              />
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

        <EditSecond
          modalIsOpen={this.state.isSecondEditDialogOpenned}
          closeModal={this.closeSecondEditDialog}
          profile={profile}
          submitForm={this.onProfileEditSecond}
          toggleCurrentlyWorking={this.toggleCurrentlyWorking}
          isCurrentlyWorking={this.state.isCurrentlyWorking}
          currentFrom={this.state.current_from}
          currentTo={this.state.current_to}
          onFromChanged={this.onFromChanged}
          onToChanged={this.onToChanged}
          selectedIndex={this.state.selectedIndex}
        />

        <AddThird
          modalIsOpen={this.state.isThirdAddDialogOpenned}
          closeModal={this.closeThirdAddDialog}
          profile={profile}
          submitForm={this.onProfileUpdateThird}
          toggleCurrentlyWorking={this.toggleCurrentlyWorking}
          isCurrentlyWorking={this.state.isCurrentlyWorking}
          currentFrom={this.state.current_from}
          currentTo={this.state.current_to}
          onFromChanged={this.onFromChanged}
          onToChanged={this.onToChanged}
        />

        <EditThird
          modalIsOpen={this.state.isThirdEditDialogOpenned}
          closeModal={this.closeThirdEditDialog}
          profile={profile}
          submitForm={this.onProfileEditThird}
          toggleCurrentlyWorking={this.toggleCurrentlyWorking}
          isCurrentlyWorking={this.state.isCurrentlyWorking}
          currentFrom={this.state.current_from}
          currentTo={this.state.current_to}
          onFromChanged={this.onFromChanged}
          onToChanged={this.onToChanged}
          selectedIndex={this.state.selectedIndex}
        />

        <AddSkills
          modalIsOpen={this.state.isSkillAddDialogOpenned}
          closeModal={this.closeSkillAddDialog}
          profile={profile}
          submitForm={this.onProfileUpdateSkill}
          toggleCurrentlyWorking={this.toggleCurrentlyWorking}
          isCurrentlyWorking={this.state.isCurrentlyWorking}
          currentFrom={this.state.current_from}
          currentTo={this.state.current_to}
          onFromChanged={this.onFromChanged}
          onToChanged={this.onToChanged}
        />

        <DeleteSkills
          modalIsOpen={this.state.isSkillDeleteDialogOpenned}
          closeModal={this.closeSkillDeleteDialog}
          profile={profile}
          submitForm={this.onProfileDeleteSkill}
          toggleCurrentlyWorking={this.toggleCurrentlyWorking}
          isCurrentlyWorking={this.state.isCurrentlyWorking}
          currentFrom={this.state.current_from}
          currentTo={this.state.current_to}
          onFromChanged={this.onFromChanged}
          onToChanged={this.onToChanged}
          tempSkills={this.state.tempSkills}
          setSkills={this.setTempSkills}
          deleteSKillFunc={this.deleteSKillFunc}
        />

        <AddLinks
          modalIsOpen={this.state.isLinkAddDialogOpenned}
          closeModal={this.closeLinkAddDialog}
          profile={profile}
          submitForm={this.onProfileUpdateLink}
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

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  updateProfile,
  updateStatus,
  addExperience,
  editExperience,
  deleteExperience,
  deleteProject,
  editProjects,
  addProject,
  addSkill,
  addLink,
})(Me);
