import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as usersActions from '../actions/users';
import actions from '../actions/actions';


class Jumbotron extends Component {

    style = {
        backgroundColor: "#396afc",
        background: "-webkit-linear-gradient(to right, #2948ff, #396afc)",
        height: "auto"
    }

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
    render() {
        const hasErrors = (this.props.authenticationError) ? 'block border border-red-500 p-2 mb-2 bg-red-700 text-white' : 'hidden';

        return (
            <div style={this.style} className="jumbotron sm:h-20 md:h-20">
                <div className="container w-full max-w-screen-xl relative mx-auto px-6 pt-16 pb-40 md:pb-24">
                    <div className="xl:flex -mx-6">
                        <div className="px-6 text-left md:text-center xl:text-left max-w-2xl md:max-w-3xl mx-auto">
                            <p className="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-white leading-tight">
                                <span className="font-medium font-bold text-2xl">Whatever challenges</span> you are facing in your career, projects, businesses, family, social life etc… <span className="font-bold">submit them</span> to IBISUBIZO and <span className="font-bold">get them</span> fixed by Experts!
                            </p>
                        </div>
                        <div className="mt-12 xl:mt-0 px-6 flex-shrink-0 hidden sm:hidden md:block">
                            <div className="border-0 mx-auto" style={{width: "40rem", height: "250px"}}>
                                <div className="sign-in">
                                    <form onChange={this.onFieldChanged.bind(this)} onSubmit={this.onSubmit.bind(this)}>
                                        <div className={hasErrors}>
                                            {this.props.authenticationError && <p>{this.props.authenticationError}</p>}
                                        </div>
                                        <div className="w-full inline-block border-blue-100 bg-white p-2">
                                            <label className="block text-gray-800">Phone Number</label>
                                            <input autoComplete={`off`} type="text" name="phone" className="block border-none outline-none" placeholder="0780102799" />
                                        </div>
                                        <div className="w-full inline-block border-blue-100 bg-white p-2 mt-4 mb-8">
                                            <label className="block text-gray-800">Password</label>
                                            <input autoComplete={`off`} type="password" name="password" className="block border-none outline-none" placeholder="Password" />
                                        </div>

                                        <div className="flex">
                                            <button className="bg-transparent text-white font-bold border-white border-2 w-1/4 p-2 hover:bg-opaque mr-8 inline-block" type="submit">Login</button>
                                            <p className="text-white">Don't have an account? <Link to="/auth/register">Register</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Jumbotron)
