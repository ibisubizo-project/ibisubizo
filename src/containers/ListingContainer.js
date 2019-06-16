import React from 'react'
import Listing from './Listing';
import { loadProblems, loadUsersProblem } from '../actions/problems';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import problemsApi from '../services/problemsApi'
import metricsApi from '../services/metricsApi';


class ListingContainer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      showListings: false,
      showPersonalListing: false,
      showTrendings: true,
      isAuthenticated: false,
      problems: [],
      userProblems: [],
      trending: [],
      page: 1,
      hasMore: true,
      error: ''
    }
    this.getAllProblems = this.getAllProblems.bind(this)
    this.getAllUsersProblems = this.getAllUsersProblems.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.getUserProblems = this.getUserProblems.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }


  //Fetching all problems whether the user is authenticated or not
  getAllProblems() {
    let { page } = this.state
    this.setState({loading: true})
    problemsApi.getAllApprovedProblems(page).then(result => {
      result.length === 0 ? this.setState({hasMore: false}) : this.setState({problems: [...this.state.problems, ...result], loading: false})
    }).catch(error => this.setState({error: error, loading: false}))
  }

  componentDidMount() {
    let { page } = this.state
    this.getAllProblems(page) //Get the first initial problems
    let userData = JSON.parse(localStorage.getItem("userData"))
    if(userData !== null) {
      if(this.props.data.isAuthenticated === true && userData._id !== null ) {
        this.getAllUsersProblems(userData._id)
        this.getTrendingProblems()
      }
    }
  }

  getUserProblems(event) {
    event.preventDefault()
    this.setState({showPersonalListing: true, showListings: false, showTrendings: false})
  }

  getAllUsersProblems(user_id) {
    problemsApi.getAllUsersProblems(user_id, 0).then(result => {
      this.setState({isAuthenticated: true, userProblems: result})
    })
  }

  getTrendingProblems() {
    metricsApi.getTrendingProblems().then(result => {
      this.setState({trending: result})
    })
  }

  showLatest(event) {
    event.preventDefault()
    this.setState({showPersonalListing: false, showListings: true, showTrendings: false})
  }

  showTrendings(evt) {
    this.setState({showTrendings: true, showPersonalListing: false, showListings: false})
  }

  loadMore() {
    this.setState(prevState => ({
      page: prevState.page + 1
    }), this.getAllProblems)
  }
  handleTabChange(event, newValue) {
    this.setState({value: newValue});
  }

  render() {
    return (
      <div className="container sm:w-full mx-auto mt-2 overflow-x-hidden p-4">
        <div className="w-full m-0 sm:m-4 sm:w-4/5 md:w-3/5 rounded">
          <div>
            <div className="flex justify-between bg-gray-800 text-white p-2">
                <div>
                  <p className="font-medium cursor-pointer" onClick={() => this.showTrendings()}>Trending Problems</p>
                </div>
                <div className="flex">
                  <p className="mr-3 cursor-pointer" onClick={this.showLatest.bind(this)}>Latest Problems</p>
                  <p className="mr-3 cursor-pointer" onClick={this.getUserProblems.bind(this)}>My Listings</p>
                </div>
              </div>
          </div>
          {this.state.showTrendings && <Listing problems={this.state.trending} />}
          {this.state.showListings && <Listing problems={this.state.problems} />}
          {this.state.showPersonalListing && <Listing personalListings={true} problems={this.state.userProblems || []} />} 
          {!this.state.showPersonalListing & !this.state.showTrendings & this.state.hasMore ? (<div className="w-full text-center p-2 bg-white text-black border border-teal-600 cursor-pointer hover:bg-teal-700 hover:text-white" onClick={this.loadMore}>Load More</div>): ''}
        </div>
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
