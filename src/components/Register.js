import React from 'react'
import {bindActionCreators} from 'redux'  
import {connect} from 'react-redux'
import * as usersActions from '../actions/users';


class Register extends React.Component {
    state = {
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
        //TODO: Verify dirty data
        let {
            username,first_name,last_name,about_me,password,
            email,city,country,profile_facebook,profile_twitter,
            profile_instagram,profile_google,profile_website
        } = this.state 


        let form = {
            username,
            first_name,
            last_name,
            email,
            password,
            city,
            country,
            about_me,
            online_profile : {
                profile_facebook,
                profile_twitter,
                profile_google,
                profile_instagram,
                profile_website
            }
        }

        this.props.actions.register(form);
    }

    onFieldChanged (event) {
        this.setState({[event.target.name]: event.target.value})
    }
  
    render () {
      return (  
        <form className="font-sans text-sm rounded w-full max-w-md mx-auto my-8 px-8 pt-6 pb-8" onChange={this.onFieldChanged.bind(this)} onSubmit={this.onSubmit.bind(this)}>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" name="first_name" type="text" placeholder="First Name" />
            </div>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="Last Name" type="text" name="last_name" />
            </div>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="Username" type="text" name="username" />
            </div>

            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="Password" type="password" name="password" />
            </div>
          <div className="relative border rounded mb-4 shadow appearance-none label-floating">
          <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="E-mail Address" type="email" name="email" /></div>
          <div className="relative border rounded mb-4 shadow appearance-none label-floating">
          <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="City" type="text" name="city" /></div>
          <div className="relative border rounded mb-4 shadow appearance-none label-floating">
          <input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" placeholder="Country" type="text" name="country" /></div>
          <div className="relative border rounded mb-4 shadow appearance-none label-floating">
              <textarea className="w-full py-2 px-3 text-grey-darker leading-normal rounded" name="about_me" cols="30" rows="10" defaultValue="About Me goes here..."></textarea>
          </div>

          <div className="onlineProfiles">
            <h3>Online Profiles</h3> <hr/>

            <div className="relative border rounded mb-4 shadow appearance-none label-floating"><input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" type="text" name="profile_facebook" placeholder="Facebook Profile" /></div>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating"><input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" type="text" name="profile_twitter" placeholder="Twitter Profile" /></div>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating"><input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" type="text" name="profile_instagram" placeholder="Instagram Profile"/></div>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating"><input className="w-full py-2 px-3 text-grey-darker leading-normal rounded" type="text" name="profile_website" placeholder="Website URL" /></div>
          </div>
          <button className="bg-black hover:bg-black text-white py-2 px-4" type="submit">Sign Up</button>
        </form>
      )
    }
  }


function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(usersActions, dispatch)
    };
}
export default connect(null, mapDispatchToProps)(Register)