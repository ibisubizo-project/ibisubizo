import React, {Component} from 'react';
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ListItemToolBar from './ListItemToolBar';
import AddCommentToolBar from './AddCommentToolBar';
import history from '../history';
import actions from '../actions/actions'

class ListItem extends Component {
    state = {
        created_by: {},
        reRender: false,
    }

    update() {
        this.setState({reRender: !this.state.reRender})
    }

    viewProblemDetails() {
        this.props.setSelectedProblem(this.props.problem)
        history.push(`/problem/${this.props._id}`)
    }

    render() {
        const {_id, title, text, created_at, updated_at, created_by, pictures, videos, documents, is_approved, status} = this.props;
        const localStorageUserData = localStorage.getItem("userData")

        return (
            <div onClick={this.viewProblemDetails.bind(this)} className="rounded overflow-hidden shadow-lg mb-6">
                <div className="px-6 py-6">
                    <div className="font-bold mb-2 flex justify-between">
                        {title}
                        <TimeAgo date={new Date(created_at)} />
                    </div>
                    <p className="text-grey-darker text-base">
                        {text}
                    </p>
                </div>

                <ListItemToolBar problem_id={_id} />
                {localStorageUserData ? <AddCommentToolBar callback={this.update.bind(this)} problem_id={_id} user_data={JSON.parse(localStorageUserData)} /> : '' }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.dir(state);
    return {
        selectedProblem: state.problems.selectedProblem
    }
}

const mapDispatchToProps = dispatch => ({
    setSelectedProblem: (problem) => dispatch(actions.currentSelectedProblem(problem))
})

export default connect(null, mapDispatchToProps)(ListItem);