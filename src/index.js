import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode  from 'jwt-decode'
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import actions from './actions/actions'
import UserProfile from './utils/userProfile'
import './index.css';
import userApi from './services/users';

const store = configureStore()

//Check if the user is authenticated initially
const token = localStorage.getItem('token');
if(token) {
  store.dispatch(actions.authenticateUser());
  store.dispatch(actions.fetchingUser());
  var decoded = jwt_decode(token)
  userApi.GetUserById(decoded.id)
    .then((response) => {
      store.dispatch(actions.fetchingUserSuccess(response))
      return UserProfile.setUserData(response)
    })
    .catch((err) => store.dispatch(actions.fetchingUserFailure(err)))
}

ReactDOM.render(
    <Router>
        <Root store={store} />
    </Router>,
    document.getElementById('root')
)
