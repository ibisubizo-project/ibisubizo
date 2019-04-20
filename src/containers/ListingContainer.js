import React from 'react'
import Listing from './Listing';
import { loadProblems, loadUsersProblem } from '../actions/problems';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserProfile from '../utils/userProfile'


class ListingContainer extends React.Component{
    state = {
        showListings: true,
        showPersonalListing: false,
        isAuthenticated: false
    }

    componentDidMount() {
        let userData = JSON.parse(localStorage.getItem("userData"))
        let userId = userData._id
        if(this.props.data.isAuthenticated === true) {
            this.props.fetchUsersProblem(userId)
            this.setState({isAuthenticated: true, showPersonalListing: true})
        } else {
            this.props.onFetchProblems()
            this.setState({showPersonalListing: false, showListings: true})
        }
    }

    getUserProblems(event) {
        event.preventDefault()
        this.setState({showPersonalListing: true, showListings: false})
    }

    showLatest(event) {
        event.preventDefault()
        this.setState({showPersonalListing: false, showListings: true})
    }

    render() {
        return (
            <div className="listings">
                <div className="listing-filter text-white h-12 bg-grey align-baseline py-4 px-3">
                    <div className="flex justify-between">
                        Trending Problems

                        <div className="flex justify-between">
                            <div className="mr-3 cursor-pointer" onClick={this.showLatest.bind(this)}>Latest Problems</div>
                            <div className="cursor-pointer" onClick={this.getUserProblems.bind(this)}>Mine</div  >
                        </div>
                    </div>
                </div>
                {this.state.showPersonalListing && !this.state.showListings ?  (<Listing problems={this.props.userProblems} />) : (<Listing problems={this.props.problems} />)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.dir(state);
    return {
        problems: state.problems.problems,
        userProblems: state.problems.userProblems
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchProblems: () => dispatch(loadProblems()),
    fetchUsersProblem: (id) => dispatch(loadUsersProblem(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListingContainer))