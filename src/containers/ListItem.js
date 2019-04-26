import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ListItemToolBar from './ListItemToolBar';
import AddCommentToolBar from './AddCommentToolBar';
import history from '../history';

class ListItem extends Component {
    state = {
        created_by: {},
        reRender: false,
    }

    update() {
        this.setState({reRender: !this.state.reRender})
    }

    viewProblemDetails() {
        alert("Clicking problem")
        return <Redirect to={`/problems/${this.props._id}`} />
    }

    render() {
        const {_id, title, text, created_at, updated_at, created_by, pictures, videos, documents, is_approved, status} = this.props;
        const localStorageUserData = localStorage.getItem("userData")

        return (
            <div onClick={() => history.push(`/problem/${this.props._id}`)} className="rounded overflow-hidden shadow-lg mb-6">
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
export default ListItem;