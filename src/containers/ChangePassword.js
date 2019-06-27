import React, {Component} from 'react'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import userApi from '../services/users'

class ChangePassword extends Component {
    state = {
        message: '',
        userId: '',
        token: '',
        success: false
    }
    componentDidMount() {
        const queryStrings = queryString.parse(this.props.location.search)
        if(queryStrings.userId && queryStrings.token && queryStrings.userId.length > 0 && queryStrings.token.length > 0) {
            this.setState({userId: queryStrings.userId, token: queryStrings.token})
        }
    }

    onFieldChanged (event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(evt) {
        evt.preventDefault()
        if(!this.state.password || !this.state.confirm_password) {
            this.setState({message: "Password cannot be empty"})
            return
        }
        if(this.state.password !== this.state.confirm_password) {
            this.setState({message: "Passwords need to match"})
            return
        }

        if(this.state.password.length < 8) {
            this.setState({message: "Password length must be 8 and above"})
            return
        }
        let payload = {
            password: this.state.password,
            user_id: this.state.userId
        }

        userApi.ChangePassword(this.state.token, payload).then(result => {
            this.setState({message: result.error, success: true, password: '', confirm_password: ''})
        }).catch(error => {
            if(error.response.status === 400) {
                this.setState({message: error.response.data.error})
            }
        })
    }
    render() {
        const hasErrors = (this.state.message) ? 'block border border-red-500 p-2 mb-2' : 'hidden';

        return (
            <div className="container mx-auto mt-12">
              <form
                onChange={this.onFieldChanged.bind(this)} onSubmit={this.onSubmit.bind(this)}
                className="font-sans text-sm rounded w-full max-w-md mx-auto my-8 px-8 pt-6 pb-8 bg-white"
                >
                  <h1 className="text-2xl pb-3 font-medium mt-4 mb-4 border-b-4 border-black">Change Password</h1>
                  <div className={hasErrors}>
                    {this.state.message && <p>{this.state.message}</p>}
                    {this.state.success && <p>Please Login <Link to="/auth/login">Here</Link></p>}
                  </div>
                  <div className="relative rounded mb-4 appearance-none label-floating">
                    <label>Password</label>
                    <input required className="leading-normal transition focus:outline-0 border border-black focus:bg-white text-black py-2 pl-2 block w-full appearance-none leading-normal ds-input mt-2" autoComplete="off" name="password" type="password" placeholder="Password" />
                  </div>

                  <div className="relative rounded mb-4 appearance-none label-floating">
                    <label>Confirm Password</label>
                    <input required className="leading-normal transition focus:outline-0 border border-black focus:bg-white text-black py-2 pl-2 block w-full appearance-none leading-normal ds-input mt-2" autoComplete="off" name="confirm_password" type="password" placeholder="Confirm Password" />
                  </div>

                  <div className="toolbar text-black p-0 m-0 text-center">
                      <div>
                          <button className="bg-teal-700 text-white font-bold py-2 px-4 mr-4  rounded" type="submit">Submit</button>
                      </div>
                  </div>
              </form>
            </div>
        )
    }
}

export default ChangePassword;