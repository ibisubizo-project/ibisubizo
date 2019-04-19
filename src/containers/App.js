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
        // console.dir(this.props);

        // if (this.props.loading) {
        //     return <div>Loading</div>
        // }

        // let listItems = undefined;

        // if (this.props.problems) {
        //      listItems = this.props.problems.map((problem) => <div key={problem._id}>{problem.title}</div>) 
        // }

        // return (
        //     <div>
        //         <h1>App Loading...</h1>
        //         {listItems}
        //     </div>
        // )

        return (
            <div>
              <NavBar />

              <div className="container mx-auto">
                <ProblemBox />
                <ListingContainer />
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.dir(state);
    return {
        problems: state.problems.problems
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchProblems: () => dispatch(loadProblems())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))