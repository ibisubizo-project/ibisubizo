import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class PageNotFound extends Component {
    render() {
        return (
            <div className="font-sans text-sm rounded w-full max-w-md mx-auto my-8 px-8 pt-6 pb-8">
                <h1 className="text-base" style={{fontSize: '168px', color: '#ff508e', textTransform: 'uppercase'}}>404</h1>
                <p>The page you are looking for cannot be found</p>
                <p>Return to <Link className="text-blue-800" to='/'>Homepage>></Link></p>
            </div>
        )
    }
}

export default PageNotFound