import React, {Component} from 'react'
import { Redirect} from 'react-router-dom'
import userApi from '../services/users';


class ForgetPassword extends Component {
    state ={
        message: '',
        goHome: false
    }

    onFieldChanged (event) {
        this.setState({[event.target.name]: event.target.value})
    }
    redirectBackHome() {
        this.setState({goHome: true})
    }

    onSubmit(evt) {
        evt.preventDefault()
        let payload = {
            phone: this.state.phone
        }
        if(!this.state.phone) {
            this.setState({message: "Phone number is required"})
            return
        }
        userApi.ForgetPassword(payload).then(result => {
            console.dir(result)
            this.setState({message: result.error})
        }).catch(error => {
            console.dir(error)
        })

    }
    render() {
        if(this.state.goHome) {
            return <Redirect to="/" />
        }
        const hasErrors = (this.state.message) ? 'block border border-red-500 p-2 mb-2' : 'hidden';
        return (
            <div className="container mx-auto mt-12">
              <form
                onChange={this.onFieldChanged.bind(this)} onSubmit={this.onSubmit.bind(this)}
                className="font-sans text-sm rounded w-full max-w-md mx-auto my-8 px-8 pt-6 pb-8 bg-white"
                >
                  <h1 className="text-2xl pb-3 font-medium mt-4 mb-4 border-b-4 border-black">Forget Password</h1>
                  <div className={hasErrors}>
                    {this.state.message && <p>{this.state.message}</p>}
                  </div>
                  <div className="relative rounded mb-4 appearance-none label-floating">
                    <label>Please enter your phone number to search for your account.</label>
                    <input className="leading-normal transition focus:outline-0 border border-black focus:bg-white text-black py-2 pl-2 block w-full appearance-none leading-normal ds-input mt-2" autoComplete="off" name="phone" type="text" placeholder="Phone Number" />
                  </div>

                  <div className="toolbar text-black p-0 m-0 text-center">
                      <div>
                          <button className="bg-teal-700 text-white font-bold py-2 px-4 mr-4  rounded" type="submit">Submit</button>
                          <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={this.redirectBackHome.bind(this)}>Cancel</button>
                      </div>
                  </div>
              </form>
            </div>
          )
    }
}

export default ForgetPassword