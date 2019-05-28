import React from 'react'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as usersActions from '../actions/users';
import actions from '../actions/actions';

class Login extends React.Component {
    onSubmit (event) {
        event.preventDefault()
        this.props.actions.login(this.state)
    }

    onFieldChanged (event) {
        this.setState({[event.target.name]: event.target.value})
    }

    componentWillUnmount() {
      this.props.clearAuthError()
    }
  
    render () {
      const hasErrors = (this.props.authenticationError) ? 'block border border-red-500 p-2 mb-2' : 'hidden';

      return (
        <form
          onChange={this.onFieldChanged.bind(this)} onSubmit={this.onSubmit.bind(this)}
          className="font-sans text-sm rounded w-full max-w-md mx-auto my-8 px-8 pt-6 pb-8">
          <div className={hasErrors}>
            {this.props.authenticationError}
          </div>
          <div className="relative border rounded mb-4 shadow appearance-none label-floating">
            <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" name="phone" type="text" placeholder="Phone Number" />
          </div>
          <div className="relative border rounded mb-4 shadow appearance-none label-floating">
            <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" name="password" type="password" placeholder="Password" />
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
            <p>You don't have an account? <Link to='/auth/register'>Register Here</Link></p>
          </div>
        </form>
      )
    }
  }


function mapStateToProps(state) {
  return {
    authenticationError: state.usersReducer.error
  }
}
function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(usersActions, dispatch),
      clearAuthError: () =>  dispatch(actions.clearAuthenticationError())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)