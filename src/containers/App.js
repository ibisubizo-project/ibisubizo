import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadProblems } from '../actions/problems'
import ProblemBox from './ProblemBox'
import Jumbotron from './Jumbotron'
import ListingContainer from './ListingContainer'
import { Helmet } from 'react-helmet'


class App extends Component {
    componentDidMount() {
        this.props.onFetchProblems();
    }
    render() {
        return (
            <div className="content-container p-0 sm:p-0">
                <Helmet>
                    <title>Ibisubizo | A Solution Platform.</title>

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@ibisubizo" />
                    <meta name="twitter:title" content="Ibisubizo - A Solution Platform." />
                    <meta name="twitter:description" content="Are you facing any issue? Submit it to us and get a Solution!." />
                    <meta name="twitter:image" content="%PUBLIC_URL%/ibisubizo.jpg" />
                    <meta name="twitter:creator" content="@opiumated" />
                    <meta property="og:url" content="http://bisubizo.com/" />
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content="Ibisubizo - A Solution Platform." />
                    <meta property="og:description" content="Are you facing any issue? Submit it to us and get a Solution!." />
                    <meta property="og:image" content="%PUBLIC_URL%/ibisubizo.jpg"  />
                </Helmet>
                {!this.props.userIsAuthenticated && <Jumbotron />}
                <ProblemBox />
                <ListingContainer data={this.props.user} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        problems: state.problems.problems,
        user: state.usersReducer,
        userIsAuthenticated: state.usersReducer.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchProblems: () => dispatch(loadProblems())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))