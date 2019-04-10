import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import App from './App'


const Root = ({ store }) => (
    <Provider store={store}>
        <div>
        <Route path="/" component={ () => <div><h1>Hello World</h1></div>} />
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root