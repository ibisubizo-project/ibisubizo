import React from 'react'
import Listing from './Listing';
import { loadProblems } from '../actions/problems';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'


class ListingContainer extends React.Component{

    componentDidMount() {
        this.props.onFetchProblems();
    }
    render() {
        return (
            <div className="listings">
                <div className="listing-filter text-white h-12 bg-grey align-baseline py-4 px-3">
                    <div className="flex justify-between">
                        Trending Problems 

                        <div className="flex justify-between">
                            <div className="mr-3">Latest Problems</div>
                            <div>Mine</div  >
                        </div>
                    </div>
                </div>
                <Listing problems={this.props.problems} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListingContainer))