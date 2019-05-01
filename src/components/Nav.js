import React from 'react';
import { Link } from 'react-router-dom'



const NavBar = () => {
    return (
        <div className="container mx-auto bg-teal h-12 text-white pl-10">
            <div className="flex justify-between">
                <ul className="list-reset inline-block flex mt-3">
                    <li className="mr-2">
                        <Link className="text-white no-underline" to="/">Home</Link>
                    </li>
                    <li className="mr-2">
                        <Link className="text-white no-underline" to="/about">About Us</Link>
                    </li>
                    <li className="mr-2">
                        <Link className="text-white no-underline" to="/term">Terms & Conditions</Link>
                    </li>
                </ul>

                <div className="navbar-right">
                    <ul className="list-reset inline-block flex mt-3">
                        <li className="mr-2">
                            <Link className="text-white no-underline" to="/auth/login">Login</Link>
                        </li>
                        <li className="mr-2">
                            <Link className="text-white no-underline" to="/auth/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar;