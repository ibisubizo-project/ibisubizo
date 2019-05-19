import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'



const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      !!localStorage.getItem("userData")
        ? <Component {...props} />
        : <Redirect to='/auth/login' />
    )} />
  )

export default PrivateRoute