import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import {connect} from 'react-redux'
import Auth from '../utils/auth';

class NavBar extends Component {
  render() {
    return (
      <div className="items-center z-100 bg-white text-black h-24 shadow sm:shadow-md md:shadow-lg">
        <div className="container mx-auto" style={{lineHeight: '96px'}}>
          <div className="flex justify-between p-0">
            <Link to="/" className="text-2xl no-underline text-center align-middle">Ibusibuzo</Link>

            <div className="nav-content-right hidden sm:hidden md:block lg:block">
                <ul className="flex list-reset">
                  <li className="mr-3">
                    <Link to='/about' className="no-underline appearance-none text-base items-center hover:text-gray-700">About Us</Link>
                  </li>
                  <li className="mr-3">
                    <Link to='/term' className="no-underline appearance-none text-base items-center hover:text-gray-700">Terms and Conditions</Link>
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