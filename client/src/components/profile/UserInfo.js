import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../TaskBarterLogo_Transparent.png';
import PropTypes from 'prop-types';
import { userPersonalDetails } from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

var MonthName=["January", "February","March","April","May","June","July","August","September","October","November","December"];
var gender=["Male","Female","Rather not say"];

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      FName: '',
      LName: '',
      address:'',
      headline:'',
      DobDay:'',
      DobMonth:'January',
      DobYear:'',
      PhoneNo:'',
      gender: 'Male',
      errMsg: '',
      errors: {},
      isLoading: false 
    };

  }
  
  componentDidMount() {
    document.getElementById('body').className = 'login-body';
    document.getElementById('html').className = 'login-html';
   
  }
  
 onClick=e=>{
  e.preventDefault();
  var regex = '';

  regex = /^[a-zA-Z]{3,32}$/;
  if (!regex.test(this.state.FName) || !regex.test(this.state.LName)) {
    this.setState({
      errMsg: 'Your first or last name is not correct.'
    });
    return;
  }
  else if (this.state.DobDay==='' || this.state.DobMonth==='' || this.state.DobYear==='') {
    this.setState({
      errMsg: 'You forgot to add your birthday day or year'
    });
  
    return;
  }
  else if (this.state.address==='' ) {
    this.setState({
      errMsg: 'You forgot to add your address'
    });
    return;
  }
  else if (this.state.PhoneNo==='' ) {
    this.setState({
      errMsg: 'You forgot to add your Phone No.'
    });
    return;
  }
  else if (this.state.headline==='' ) {
    this.setState({
      errMsg: 'You forgot to add your Headling'
    });
    return;
  }
  this.setState({
    errMsg: ''
  });
  const userInformation={
   FName: this.state.FName,
    LName: this.state.LName,
    address:this.state.address,
    headline:this.state.headline,
    DobDay:this.state.DobDay,
    DobMonth:this.state.DobMonth,
    DobYear:this.state.DobYear,
    PhoneNo:this.state.PhoneNo,
    gender: this.state.gender,
  }
  this.setState({
    errors: {}
  });
  this.props.userPersonalDetails(userInformation,this.props.history);
  
}
  onChange = e => {this.setState({ [e.target.id]: e.target.value });
  };
  componentWillUnmount() {
    document.getElementById('body').className = '';
    document.getElementById('html').className = '';
  }
  setCombox = (month,count) => {
    let str = []

    for (let i = 0; i < count; i++) {
      str.push(<option  value={month[i]}>
        {
          month[i]
        }
      </option>)
    }
    return str
  }
 


  render() {
    const { errors } = this.state;
    
    const errMsg =
    this.state.errMsg || errors.FName ;
    var isLoading = false;
    if (Object.entries(errors).length !== 0) {
      isLoading = false;
    } else {
      isLoading = true;
    }
    
      return (

       
      <div>
      <form>
      <fieldset>
      {errMsg ? (
            <div className='alert alert-danger text-center'>
              <strong>Error: </strong> {errMsg}
            </div>
          ) : null}
          <br/>
         
          <img className='mb-4 login-logoUserInfo' src={logo} alt='' />
     <div className="UserInfohead1 userInfoLeftMargin">
        Update your Profile 
      </div>
      <div className="UserInfoHead2 userInfoLeftMargin">
            It help us to find a suitable task for you
            <br /><br />
      </div>

        <div className="form-group row">
        <div className="col-sm-3 userInfoLeftMargin">
       
          <input 
              type="text" 
              onChange={this.onChange}
              value={this.state.FName}
              className="form-control col-xs-4" 
              id="FName" 
              error={errors.FName}
              placeholder="First Name"/>
          </div>    
          <div className="col-sm-3 userInfoInsideMargin">
          <input 
              type="text" 
              onChange={this.onChange}
              className="form-control col-xs-4" 
              id="LName" 
              error={errors.LName}
              placeholder="Last Name"
              value={this.state.LName}/>
         </div>
        </div>
       
        <div className="form-group row "  ref = {(input)=> this.menu = input}>
        <div className="col-sm-3 userInfoLeftMargin">
               <select className="form-control" 
                       id="DobMonth" 
                       onChange={this.onChange}
                       value={this.state.DobMonth}
                       error={errors.DobMonth}>
                       
                {this.setCombox(MonthName,12)}
               
               </select> 
        </div>
        
      <div className="col-sm-2 userInfoInsideMargin">
          <input 
                  type="text" 
                  onChange={this.onChange}
                  className="form-control col-xs-5" 
                  id="DobDay" 
                  error={errors.DobDay}
                  value={this.state.DobDay}
                  placeholder="Day"/>
     </div>
      <div className="col-sm-2 userInfoInsideMargin">
          <input 
                  type="text" 
                  className="form-control" 
                  onChange={this.onChange}
                  id="DobYear"
                  error={errors.DobYear}
                  value={this.state.DobYear} 
                  placeholder="Year"/>  
     </div>
     </div>
     <div className="UserInfoFont">Your Birthday<br/><br/></div>
     
     <div className="form-group row ">
        <div className="col-sm-3 userInfoLeftMargin">
               <select className="form-control" 
                       id="gender"  
                       error={errors.gender}
                       onChange={this.onChange}
                       value={this.state.gender}>
                       {this.setCombox(gender,3)}
               </select> 
        </div>
        </div>
        <div className="UserInfoFont">Your Gender<br/><br/></div>
        <div className="UserInfoFont"><br/>We need your contact information to open further<br/> opportunities for you </div>
       
        <div className="form-group row ">
        <div className="col-sm-5 userInfoLeftMargin">
                  <input 
                  type="text" 
                  className="form-control" 
                  id="address" 
                  error={errors.address}
                  onChange={this.onChange}
                  value={this.state.address}
                  placeholder="Address"/>  
        </div>
        </div>
     
       
        <div className="form-group row ">
        <div className="col-sm-3 userInfoLeftMargin">
                  <input 
                  type="text" 
                  className="form-control" 
                  id="PhoneNo" 
                  error={errors.PhoneNo}
                  onChange={this.onChange}
                  value={this.state.PhoneNo}
                  placeholder="Phone No."/>  
        </div>
        </div>
        <div className="UserInfoFont"><br/>Your headline help us to find a suitable task for you</div>
        <div className="form-group row ">
        <div className="col-sm-3 userInfoLeftMargin">
                  <input 
                  type="text" 
                  className="form-control" 
                  id="headline" 
                  error={errors.headline}
                  onChange={this.onChange}
                  value={this.state.headline}
                  placeholder="Headline"/>  
        </div>
        </div>
        <div className="UserInfoFont">Graphic Designer, Developer or Mathematician  etc.<br/><br/> </div>
        <div className="UserInfoButton"
         type='button' 
         onClick={this.onClick}
        >Next</div>
       
        
      </fieldset>
      </form>
    
      </div>
    );
  }
}

UserInfo.propTypes = {
  userPersonalDetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});  
  
//export default UserInfo;
export default connect(
  mapStateToProps,
  { userPersonalDetails }
)(withRouter(UserInfo));