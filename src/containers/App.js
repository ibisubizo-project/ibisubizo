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
            <div className="container m-auto p-8 text-grey-darkest">
              <div className="w-3/5">
                <ProblemBox />
                <ListingContainer data={this.props.user} />
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.dir(state);
    return {
        problems: state.problems.problems,
        user: state.usersReducer
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchProblems: () => dispatch(loadProblems())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))