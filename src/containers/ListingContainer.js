import React from 'react'
import Listing from './Listing';
import { loadProblems, loadUsersProblem } from '../actions/problems';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import problemsApi from '../services/problemsApi'


class ListingContainer extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            showListings: true,
            showPersonalListing: false,
            isAuthenticated: false,
            problems: [],
            userProblems: [],
            page: 1,
            hasMore: true, 
            error: ''
        }
        this.getAllProblems = this.getAllProblems.bind(this)
        this.getAllUsersProblems = this.getAllUsersProblems.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.getUserProblems = this.getUserProblems.bind(this)
    }


    //Fetching all problems whether the user is authenticated or not 
    getAllProblems() {
        let { page } = this.state
        this.setState({loading: true})
        problemsApi.getAllApprovedProblems(page).then(result => {
            console.dir(result)
            result.length === 0 ? this.setState({hasMore: false}) : this.setState({problems: [...this.state.problems, ...result], loading: false})
        }).catch(error => this.setState({error: error, loading: false}))
    }

    componentDidMount() {
        let { page } = this.state
        this.getAllProblems(page) //Get the first initial problems
        let userData = JSON.parse(localStorage.getItem("userData"))
        if(userData !== null) {
            if(this.props.data.isAuthenticated === true && userData._id !== null ) {
                console.log("result[1]")
                this.getAllUsersProblems(userData._id)
            }
        }
    }

    getUserProblems(event) {
        event.preventDefault()
        this.setState({showPersonalListing: true, showListings: false})
    }

    getAllUsersProblems(user_id) {
        problemsApi.getAllUsersProblems(user_id, 0).then(result => {
            console.dir(result)
            this.setState({isAuthenticated: true, userProblems: result})
        })
    }

    showLatest(event) {
        event.preventDefault()
        this.setState({showPersonalListing: false, showListings: true})
    }

    loadMore() {
        this.setState(prevState => ({
            page: prevState.page + 1
        }), this.getAllProblems)
    }
    render() {
        console.log("Evaluating state")
        console.log(this.state.showPersonalListing && !this.state.showListings)
        return (
            <div className="listings mt-6">
                <div className="listing-filter text-white h-12 bg-black align-baseline py-4 px-3 font-bold">
                    <div className="flex justify-between">
                        Trending Problems

                        <div className="flex justify-between">
                            <div className="mr-3 cursor-pointer" onClick={this.showLatest.bind(this)}>Latest Problems</div>
                            <div className="cursor-pointer" onClick={this.getUserProblems.bind(this)}>Mine</div>
                        </div>
                    </div>
                </div>
                {!this.state.showPersonalListing && <Listing problems={this.state.problems} />}
                {this.state.showPersonalListing && <Listing problems={this.state.userProblems} />}
                {/* {this.state.showListings ? (<Listing problems={this.state.problems} />) : (<Listing problems={this.state.userProblems} />)} */}
                {!this.state.showPersonalListing & this.state.hasMore ? (<div onClick={this.loadMore}>Load More</div>): ''}
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