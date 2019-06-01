import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadProblems } from '../actions/problems'
import ProblemBox from './ProblemBox'
import ListingContainer from './ListingContainer'
import Banner from '../components/Banner';


class App extends Component {
    componentDidMount() {
        this.props.onFetchProblems();
    }
    render() {
        return (
            <div className="content-container p-0 sm:p-8">
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