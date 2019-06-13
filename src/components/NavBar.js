import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import {connect} from 'react-redux'
import Auth from '../utils/auth';

class NavBar extends Component {
  toggleMenu() {
    let navBar = document.getElementById("navbar")
    if(navBar.classList.contains("hidden")) {
      navBar.classList.remove('hidden')
      navBar.classList.add('block')
    } else if(navBar.classList.contains('block')) {
      navBar.classList.remove('block')
      navBar.classList.add('hidden')
    }
  }

  render() {
    return (
      <div>
        <div className="bg-white text-black">
            <div className="container mx-auto px-4">
                <div className="flex items-center sm:justify-between py-4">
                    <div className="w-1/6 sm:hidden" id="menu" onClick={this.toggleMenu.bind(this)}>
                        <svg className="fill-current text-black h-10 w-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                    </div>
  
                    <div className="w-1/6 text-center text-black text-2xl">
                        <Link to='/'>Ibisubizo</Link>
                    </div>

                    <div className="w-2/6 text-right">
                        <div className="text-black nav-content-right hidden sm:hidden md:block lg:block">
                            <ul className="flex">
                                <li className="mr-3">
                                    <Link to='/about'>About Us</Link>
                                </li>
                                <li className="mr-3">
                                    <Link to='/term'>Terms and Conditions</Link>
                                </li>
                                {!this.props.userIsAuthenticated && (
                                  <React.Fragment>
                                    <li className="mr-3">
                                      <Link to='/auth/login' className='no-underline text-base items-center hover:text-gray-700'>Sign In</Link>
                                    </li>
                                    <li className="mr-3">
                                      <Link to='/auth/register' className='text-base items-center bg-white no-underline rounded text-teal-600 pr-4 pl-4 pt-2 pb-2 w-10 border border-teal'>Join</Link>
                                    </li>
                                  </React.Fragment>
                                )}

                                {this.props.userIsAuthenticated && (
                                  <li className="text-black no-underline cursor-pointer" onClick={() => this.props.logout()}>Logout</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="navbar" className="hidden navbar sm:hidden md:hidden lg:hidden bg-black sm:bg-white border border-black">
            <div className="container mx-auto px-4">
                <div className="sm:flex">
                    <div className="flex -mb-px mr-6">
                        <Link to='/about' className="no-underline text-base text-white opacity-50 sm:opacity-100 sm:text-white flex items-center py-4 mr-6 ">About Us</Link>
                    </div>

                    <div className="flex -mb-px mr-6">
                        <Link to="/term" className="no-underline text-base  text-white opacity-50 sm:opacity-100 sm:text-white flex items-center py-4 mr-6">Terms & Conditions</Link>
                    </div>

                    {!this.props.userIsAuthenticated && (
                      <React.Fragment>
                        <div>
                          <Link to='/auth/login' className='no-underline text-base items-center text-white hover:text-gray-700'>Sign In</Link>
                        </div>
                        <div>
                          <Link to='/auth/register' className='no-underline text-base text-white opacity-50 sm:opacity-100 sm:text-white flex items-center py-4 mr-6'>Join</Link>
                        </div>
                      </React.Fragment>
                    )}
                    {this.props.userIsAuthenticated && (
                      <div className="no-underline text-base items-center text-white hover:text-gray-700 mb-4" onClick={() => this.props.logout()}>Logout</div>
                    )}
                </div>
            </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
      userIsAuthenticated: state.usersReducer.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => ({
logout: () => Auth.Logout()
})


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)