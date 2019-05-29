import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadProblems } from '../actions/problems'
import ProblemBox from './ProblemBox'
import ListingContainer from './ListingContainer'


class App extends Component {
    componentDidMount() {
        this.props.onFetchProblems();
    }
    render() {
        return (
            <React.Fragment>
                <ProblemBox />
                <ListingContainer data={this.props.user} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        problems: state.problems.problems,
        user: state.usersReducer
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchProblems: () => dispatch(loadProblems())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))