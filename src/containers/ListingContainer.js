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
        isAuthenticated: false,
        problems: [],
        userProblems: [],
        page: 1,
    }

    fetchFirstProblems() {
        let { page } = this.state
        let userData = JSON.parse(localStorage.getItem("userData"))
        if(userData !== null) {
            if(this.props.data.isAuthenticated === true && userData._id !== null ) {
                console.log("result[1]")
                this.props.fetchUsersProblem(userData._id, page)
                this.setState({isAuthenticated: true, showPersonalListing: true, problems: this.props.problems, userProblems: this.props.userProblems})
            }
        } else {
            console.log("result[2]")
            this.props.onFetchProblems(page)
            this.setState({showPersonalListing: false, showListings: true})
        }
    }

    componentDidMount() {
        this.fetchFirstProblems()
    }

    getUserProblems(event) {
        event.preventDefault()
        this.setState({showPersonalListing: true, showListings: false, problems: [...this.props.problems, ...this.state.problems] , userProblems: this.props.userProblems})
    }

    showLatest(event) {
        event.preventDefault()
        this.setState({showPersonalListing: false, showListings: true})
    }

    loadMore() {
        this.setState(prevState => ({
            page: prevState.page + 1
        }), this.fetchFirstProblem)
    }

    render() {
        return (
            <div className="listings mt-6">
                <div className="listing-filter text-white h-12 bg-black align-baseline py-4 px-3 font-bold">
                    <div className="flex justify-between">
                        Trending Problems

                        <div className="flex justify-between">
                            <div className="mr-3 cursor-pointer" onClick={this.showLatest.bind(this)}>Latest Problems</div>
                            <div className="cursor-pointer" onClick={this.getUserProblems.bind(this)}>Mine</div  >
                        </div>
                    </div>
                </div>
                {this.state.showPersonalListing && !this.state.showListings ?  (<Listing problems={this.props.userProblems} />) : (<Listing problems={this.props.problems} />)}
                <div onClick={this.loadMore.bind(this)} className="mx-auto container">Load More</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        problems: state.problems.problems,
        userProblems: state.problems.userProblems
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchProblems: (page) => dispatch(loadProblems(page)),
    fetchUsersProblem: (id, page) => dispatch(loadUsersProblem(id, page))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListingContainer))