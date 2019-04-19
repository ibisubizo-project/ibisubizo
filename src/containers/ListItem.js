import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import axios from 'axios';
import ListItemToolBar from './ListItemToolBar';
import AddCommentToolBar from './AddCommentToolBar';

class ListItem extends Component {
    state = {
        created_by: {}
    }
    render() {
        const {_id, title, text, created_at, updated_at, created_by, pictures, videos, documents, is_approved, status} = this.props;
        
        return (
            <div className="rounded overflow-hidden shadow-lg mb-6">
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
                <AddCommentToolBar problem_id={_id} user_id={192012} />
            </div>
        )
    }
}
export default ListItem;