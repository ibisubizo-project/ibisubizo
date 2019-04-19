import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Router, Route, Switch } from 'react-router-dom'
import App from './App'
import PrivateRoute from './PrivateRoute'
import Login from '../components/Login'
import Register from '../components/Register'
import history from '../../src/history'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/bye' component={()=> <h1>Bye Bye</h1>} />
          <Route path='/auth/login' component={Login} />
          <Route path='/auth/register' component={Register} />
          <Route path={'*'} component={()=> <h1>Page Not Found...</h1>} />
        </Switch>
        <DevTools />
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root