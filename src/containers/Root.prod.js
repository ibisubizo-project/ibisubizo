import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from '../components/Login'
import Register from '../components/Register'
import history from '../../src/history'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/auth/login' component={Login} />
          <Route path='/auth/register' component={Register} />
          <Route path={'*'} component={()=> <h1>Page Not Found...</h1>} />
        </Switch>
      </div>
    </Router>
  </Provider>
)


Root.propTypes = {
    store: PropTypes.object.isRequired,
}



export default Root