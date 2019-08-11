import React, { Component, Fragment } from 'react';
import StepWizard from 'react-step-wizard';
import logo from '../../../TaskBarterLogo_Transparent.png';
import Nav from './nav';

import styles from './wizard.css';
import transitions from './transitions.css';

export default class UserProfileNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
      transitions: {
        enterRight: 'animated enterRight',
        enterLeft: 'animated enterLeft',
        exitRight: 'animated exitRight',
        exitLeft: 'animated exitLeft',
        intro: 'animated intro'
      }
    };
  }

  updateForm = (key, value) => {
    const { form } = this.state;

    form[key] = value;
    this.setState({ form });
  };

  // Do something on step change
  onStepChange = stats => {
    // console.log(stats);
  };

  setInstance = SW => this.setState({ SW });

  render() {
    const { SW, demo } = this.state;

    return (
      <div className='container'>
        <h3>Complete Your Profile</h3>
        <div className={'jumbotron'}>
          <div className='row'>
            <div className={'col-12 col-sm-6 offset-sm-3 rsw-wrapper'}>
              <StepWizard
                onStepChange={this.onStepChange}
                isHashEnabled
                transitions={this.state.transitions}
                nav={<Nav />}
                instance={this.setInstance}
              >
                <First hashKey={'FirstStep'} update={this.updateForm} />
                <Second form={this.state.form} />
                <Progress />
                <Last hashKey={'TheEnd!'} />
              </StepWizard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  step
}) => (
  <div>
    <hr />
    {step > 1 && (
      <button className='btn btn-default btn-block' onClick={previousStep}>
        Go Back
      </button>
    )}
    {step < totalSteps ? (
      <button className='btn btn-primary btn-block' onClick={nextStep}>
        Continue
      </button>
    ) : (
      <button className='btn btn-success btn-block' onClick={nextStep}>
        Finish
      </button>
    )}
    <hr />
    <div style={{ fontSize: '21px', fontWeight: '200' }}>
      <h4>Other Functions</h4>
      <div>Current Step: {currentStep}</div>
      <div>Total Steps: {totalSteps}</div>
      <button className='btn btn-block btn-default' onClick={firstStep}>
        First Step
      </button>
      <button className='btn btn-block btn-default' onClick={lastStep}>
        Last Step
      </button>
      <button className='btn btn-block btn-default' onClick={() => goToStep(2)}>
        Go to Step 2
      </button>
    </div>
  </div>
);

/** Steps */

class First extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ''
    };
  }

  update = e => {
    this.props.update(e.target.name, e.target.value);
  };

  uploadImage = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'taskbarter',
        uploadPreset: 'profile_pictures',
        resource_type: 'image',
        cropping: true,
        format: 'jpg',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
        max_file_size: 1048576,
        multiple: false
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          this.props.update('img_url', result.info.secure_url);
          this.setState({
            img: result.info.secure_url
          });
        }
      }
    );
    widget.open();
  };

  render() {
    return (
      <div>
        <h3 className='text-center'>Welcome! Have a look around!</h3>

        <label>First Name</label>
        <input
          type='text'
          className='form-control'
          name='firstname'
          placeholder='First Name'
          onChange={this.update}
        />
        {this.state.img !== '' ? <img src={this.state.img} /> : ''}
        <button onClick={this.uploadImage}>Upload Image</button>
        <Stats step={1} {...this.props} />
      </div>
    );
  }
}

class Second extends Component {
  validate = () => {
    //if (confirm('Are you sure you want to go back?')) {
    // eslint-disable-line
    this.props.previousStep();
    //}
  };

  render() {
    return (
      <div>
        {this.props.form.firstname && (
          <h3>Hey {this.props.form.firstname}! 👋</h3>
        )}
        I've added validation to the previous button.
        <Stats step={2} {...this.props} previousStep={this.validate} />
      </div>
    );
  }
}

class Progress extends Component {
  constructor() {
    super();
  }
  state = {
    isActiveClass: '',
    timeout: null
  };

  componentDidUpdate() {
    const { timeout } = this.state;

    if (this.props.isActive && !timeout) {
      this.setState({
        isActiveClass: 'loaded',
        timeout: setTimeout(() => {
          this.props.nextStep();
        }, 3000)
      });
    } else if (!this.props.isActive && timeout) {
      clearTimeout(timeout);
      this.setState({
        isActiveClass: '',
        timeout: null
      });
    }
  }

  render() {
    const { isActiveClass } = this.state;
    const progressStyle = 'progress ' + isActiveClass;
    return (
      <div className='progress-wrapper'>
        <p className='text-center'>Automated Progress...</p>
        <div className={progressStyle}>
          <div className='progress-bar progress-bar-striped' />
        </div>
      </div>
    );
  }
}

class Last extends Component {
  submit = () => {
    alert('You did it! Yay!');
  };

  render() {
    return (
      <div>
        <div className={'text-center'}>
          <h3>This is the last step in this example!</h3>
          <hr />
        </div>
        <Stats step={4} {...this.props} nextStep={this.submit} />
      </div>
    );
  }
}
