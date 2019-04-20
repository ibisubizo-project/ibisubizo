import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadProblems } from '../actions/problems';
import NavBar from '../components/Nav';
import ProblemBox from './ProblemBox';
import ListingContainer from './ListingContainer';


class App extends Component {
    componentDidMount() {
        this.props.onFetchProblems();
    }
    render() {
        console.log("<App />")
        console.dir(this.props.user.authedUser)
        return (
            <div>
              <NavBar />

              <div className="container mx-auto">
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