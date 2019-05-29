import React, { Component } from 'react'
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
            <div className="content-container p-8 bg-gray-100">
                <ProblemBox />
                <ListingContainer data={this.props.user} />
            </div>
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