import React from 'react'
import {bindActionCreators} from 'redux'
import { Redirect, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as usersActions from '../actions/users';
import actions from '../actions/actions';
import { Helmet } from 'react-helmet'

class Login extends React.Component {

    state = {
      redirectToHomePage: false
    }
    onSubmit (event) {
        event.preventDefault()
        this.props.actions.login(this.state)
    }

    onFieldChanged (event) {
        this.setState({[event.target.name]: event.target.value})
    }

    componentWillMount() {
      if(this.props.userIsAuthenticated) {
        this.setState({redirectToHomePage: true})
      }
    }

    componentWillUnmount() {
      this.props.clearAuthError()
    }

    render () {
      if(this.state.redirectToHomePage) {
        return <Redirect to='/' />
      }
      const hasErrors = (this.props.authenticationError) ? 'block border border-red-500 p-2 mb-2' : 'hidden';

      return (
        <div className="container mx-auto mt-12">
          <Helmet>
            <title>Login | Ibisubizo</title>
          </Helmet>
          <form
            onChange={this.onFieldChanged.bind(this)} onSubmit={this.onSubmit.bind(this)}
            className="font-sans text-sm rounded w-full max-w-md mx-auto my-8 px-8 pt-6 pb-8 bg-white"
            >
              <h1 className="text-2xl pb-3 font-medium mt-4 mb-4">Sign In to Ibisubizo</h1>
              <div className={hasErrors}>
                {this.props.authenticationError && <p>{this.props.authenticationError}</p>}
              </div>
              <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="leading-normal rounded transition focus:outline-0 border border-transparent focus:bg-white placeholder-gray-900 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input" name="phone" type="text" placeholder="Phone Number" />
              </div>
              <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="leading-normal rounded transition focus:outline-0 border border-transparent focus:bg-white placeholder-gray-900 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input" name="password" type="password" placeholder="Password" />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-black hover:bg-black text-white py-2 px-4" type="submit">
                Sign In
                </button>
                <a className="inline-block align-baseline text-grey hover:text-grey-darker" href="/auth/forget">
                  Forgot Password?
                </a>
              </div>

              <div className="flex mt-5">
                <p>You don't have an account? <Link to='/auth/register' className="text-blue-500 font-bold">Register Here</Link></p>
              </div>
          </form>
        </div>
      )
    }
  }


function mapStateToProps(state) {
  return {
    authenticationError: state.usersReducer.error,
    userIsAuthenticated: state.usersReducer.isAuthenticated
  }
}
function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(usersActions, dispatch),
      clearAuthError: () =>  dispatch(actions.clearAuthenticationError())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
