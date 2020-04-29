import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchUser } from '../../actions/profileAction';
import '../../style/profile/profile_page.css';
import InfoBlock from '../viewProfile/subs/InfoBlock';
import StatusViewBlock from '../viewProfile/subs/StatusViewBlock';
import SkillsViewBlock from '../viewProfile/subs/SkillsViewBlock';
import LinksViewBlock from '../viewProfile/subs/LinksViewBlock';
import ExperienceViewBlock from './subs/ExperienceViewBlock';
import ProjectsViewBlock from './subs/ProjectsViewBlock';

class UserDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      userID: '',
      myprofile: {},
      loading: true,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.setState({ userID: id, loading: true }, () => {
        this.props.searchUser(id).then((profile) => {
          this.setState({
            myprofile: profile,
            loading: false,
          });
        });
      });
    } else {
      this.setState({ userID: '' });
    }
  }

  render() {
    const profile = this.state.myprofile;
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (!profile) {
      return (
        <div className='card card-body redeem-points mb-2'>
          <div className='redeem-heading'>User doesn't exist</div>
        </div>
      );
    }
    const user = this.props.user;
    return (
      <div>
        <main role='main' className='container mt-4'>
          <div className='row'>
            <div className='col-md-4 order-md-2 mb-2'>
              <StatusViewBlock profile={profile} />
              <SkillsViewBlock profile={profile} />
              <LinksViewBlock profile={profile} />
            </div>
            <div className='col-md-8 order-md-1'>
              <InfoBlock profile={profile} user={user} />
              <ExperienceViewBlock profile={profile} user={user} />
              <ProjectsViewBlock profile={profile} user={user} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  searchUser,
})(UserDetails);
