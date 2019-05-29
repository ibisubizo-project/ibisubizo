import React from 'react'
import {bindActionCreators} from 'redux'  
import {connect} from 'react-redux'
import * as usersActions from '../actions/users';
import actions from '../actions/actions';


class Register extends React.Component {
    state = {
        error: '',
        selectedFile: null
    }

    fileSelectedHandler = event => { 
        console.dir(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    
    onSubmit (event) {
        event.preventDefault()
        let {
            firstname,lastname, middlename,password,confirm_password, phone
        } = this.state

        if(password !== confirm_password) {
            this.setState({error: 'Password mismatch'})
            return 
        }

        if(!firstname || !lastname || !middlename || !phone || !password) {
            this.setState({error: 'Please enter required fields'})
            return 
        }


        let form = {
            firstname,
            middlename,
            lastname,
            phone,
            password
        }

        this.props.actions.register(form);
    }

    onFieldChanged (event) {
        this.setState({[event.target.name]: event.target.value})
    }


    componentWillUnmount() {
        this.props.clearAuthError()
    }
  
    render () {
        const hasErrors = (this.props.authenticationError || this.state.error) ? 'block border border-red-500 p-2 mb-2' : 'hidden';
      return (
        <form className="font-sans text-sm rounded w-full max-w-md mx-auto my-8 px-8 pt-6 pb-8" onChange={this.onFieldChanged.bind(this)} onSubmit={this.onSubmit.bind(this)}>
            <div className={hasErrors}>
                {this.state.error && <p>{this.state.error} </p>}
                {this.props.authenticationError && <p>{this.props.authenticationError}</p>}
            </div>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" name="firstname" type="text" placeholder="First Name" />
            </div>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="Middle Name" type="text" name="middlename" />
            </div>

            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="Last Name" type="text" name="lastname" />
            </div>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="Phone Number" type="digit" name="phone" />
            </div>

            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="Password" type="password" name="password" />
            </div>

            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="Confirm Password" type="password" name="confirm_password" />
            </div>

          <button className="bg-black hover:bg-black text-white py-2 px-4" type="submit">Sign Up</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Register)