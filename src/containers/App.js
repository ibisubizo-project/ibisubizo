import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <div>
                <h1>App Loading...</h1>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    //errorMessage: state.errorMessage,
})

export default withRouter(connect(mapStateToProps, null)(App))