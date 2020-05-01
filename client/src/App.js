import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './components/layout/Landing';
import Landingv2 from './components/layout/Landingv2';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Explore from './components/explore/ExploreTasks';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Forgot from './components/auth/Forgot';
import AddTask from './components/task/AddTask';
import UserInfo from './components/profile/UserInfo';
import UserProfileNew from './components/profile/steps/UserProfileNew';
import Header from './components/layout/Header';
import Messages from './components/message/Messages';
import Me from './components/profile/Me';
import userDetail from './components/viewProfile/UserDetails';
import Notifications from './components/notifications/Notifications';
import Footer from './components/layout/Footer';
import MyTasks from './components/task/MyTasks';
import TaskMain from './components/task/TaskMain';
import Work from './components/Work/Work';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/header.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <div className='App'>
            <Header />
            <Route exact path='/v1' component={Landing} />
            <Route exact path='/' component={Landingv2} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/forgot' component={Forgot} />
            <Route exact path='/landing' component={Landing} />
            <Route exact path='/UserInfo' component={UserInfo} />
            <Route exact path='/user-new' component={UserProfileNew} />
            <Route exact path='/t/:id' component={TaskMain} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/add' component={AddTask} />
              <PrivateRoute exact path='/explore' component={Explore} />
              {/* <PrivateRoute path='/messages' component={Messages}>
                <PrivateRoute path='/messages/:id' component={Messages} />
              </PrivateRoute> */}
              <PrivateRoute exact path='/messages' component={Messages} />
              <PrivateRoute exact path='/messages/:id' component={Messages} />

              <PrivateRoute
                exact
                path='/notifications'
                component={Notifications}
              />
              <PrivateRoute exact path='/me' component={Me} />
              <PrivateRoute exact path='/mytasks' component={MyTasks} />
              <PrivateRoute exact path='/u/:id' component={userDetail} />
              <PrivateRoute exact path='/w/:id' component={Work} />
            </Switch>
            <ToastContainer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
