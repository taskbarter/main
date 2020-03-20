import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileAction';
import '../../style/profile/profile_page.css';
import FirstBlock from './subs/FirstBlock';
import SecondBlock from './subs/SecondBlock';
import StatusBlock from './subs/StatusBlock';
import SkillsBlock from './subs/SkillsBlock';
import LinksBlock from './subs/LinksBlock';
import EditFirst from './edit/EditFirst';

class Me extends Component {
  constructor(props) {
    super();
    this.state = {
      isFirstEditDialogOpenned: false,
      current_dob: new Date('October 4, 1997 11:13:00')
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  openFirstModal = () => {
    this.setState({ isFirstEditDialogOpenned: true });
  };

  closeFirstEditDialog = () => {
    this.setState({ isFirstEditDialogOpenned: false });
  };

  onDoBChange = d => {
    this.setState({
      current_dob: d
    });
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
              <StatusBlock profile={profile} />
              <SkillsBlock profile={profile} />
              <LinksBlock profile={profile} />
            </div>
            <div className='col-md-8 order-md-1'>
              <FirstBlock
                editModal={this.openFirstModal}
                profile={profile}
                user={user}
              />
              <SecondBlock profile={profile} />
            </div>
          </div>
        </main>
        <EditFirst
          modalIsOpen={isFirstEditDialogOpenned}
          closeModal={this.closeFirstEditDialog}
          profile={profile}
          onDoBChange={this.onDoBChange}
          current_dob={current_dob}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user
});

export default connect(mapStateToProps, { getCurrentProfile })(Me);
