import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import userApi from '../services/users';

class ConfirmToken extends Component {
    state = {
        message: '',
        userId: '',
        token: '',
        redirectToChangePassword: false
    }
    onSubmit (event) {
        event.preventDefault()
        const { match: { params } } = this.props;
        let payload = {
            reset_code : this.state.reset_code
        }
        userApi.ConfirmToken(params.token, payload).then(result => {
            console.dir(result)
            this.setState({message: result.message, userId: result.user._id, token: result.user.reset_token, redirectToChangePassword: true})
        }).catch(error => {
            if(error.response.status === 400) {
                console.dir(error)
                this.setState({message: error.response.data.error})
            }
        })
    }

    onFieldChanged (event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        const hasErrors = (this.state.message) ? 'block border border-red-500 p-2 mb-2' : 'hidden';
        if(this.state.redirectToChangePassword && this.state.userId) {
            console.log("Yes we can now redirect")
            let route = `/auth/changepassword?userId=${this.state.userId}&token=${this.state.token}`
            return <Redirect to={route} />
        }

        return (
            <div className="container mx-auto mt-12">
              <form
                onChange={this.onFieldChanged.bind(this)} onSubmit={this.onSubmit.bind(this)}
                className="font-sans text-sm rounded w-full max-w-md mx-auto my-8 px-8 pt-6 pb-8 bg-white"
                >
                  <h1 className="text-2xl pb-3 font-medium mt-4 mb-4 border-b-4 border-black">Confirm Token</h1>
                  <div className={hasErrors}>
                    {this.state.message && <p>{this.state.message}</p>}
                  </div>
                  <div className="relative rounded mb-4 appearance-none label-floating">
                    <label>Please enter the reset code sent to you</label>
                    <input required className="leading-normal transition focus:outline-0 border border-black focus:bg-white text-black py-2 pl-2 block w-full appearance-none leading-normal ds-input mt-2" autoComplete="off" name="reset_code" type="text" placeholder="Reset Code" />
                  </div>

                  <div className="toolbar text-black p-0 m-0 text-center">
                      <div>
                          <button className="bg-teal-700 text-white font-bold py-2 px-4 mr-4  rounded" type="submit">Confirm</button>
                      </div>
                  </div>
              </form>
            </div>
        )
    }
}

export default ConfirmToken