import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import App from './App'
import PrivateRoute from './PrivateRoute'
import NavBar from '../components/NavBar';
import Login from '../components/Login'
import Register from '../components/Register'
import history from '../../src/history'
import DetailComponent from './DetailComponent'
import AboutUsComponent from '../components/AboutUsComponent';
import TermsAndConditionComponent from '../components/TermsAndConditionComponent';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/bye' component={()=> <h1>Bye Bye</h1>} />
          <Route path='/auth/login' component={Login} />
          <Route path='/auth/register' component={Register} />
          <PrivateRoute path='/problem/:id' component={DetailComponent} />
          <Route path='/about' component={AboutUsComponent} />
          <Route path='/term' component={TermsAndConditionComponent} />
          <Route path={'*'} component={()=> <h1>Page Not Found...</h1>} />
        </Switch>
      </React.Fragment>
    </Router>
  </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root