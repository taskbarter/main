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

class Me extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const profile = this.props.profile.profile;
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
              <FirstBlock profile={profile} />
              <SecondBlock profile={profile} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Me);
