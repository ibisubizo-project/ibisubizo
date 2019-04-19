import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import axios from 'axios';

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
                <div className="px-6 py-4">
                    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <i className="fa fa-comment fa-lg mr-2"></i> 19
                    </span>
                    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <i className="fa fa-heart fa-lg mr-2"></i> 56
                    </span>
                    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
                        <i className="fa fa-share fa-lg mr-2"></i> 247
                    </span>
                </div>
            </div>
        )
    }

    fetchUser(created_by) {
        axios.get(`http://localhost:8000/api/users/${created_by}`).then(user => {
            this.setState({created_by: user.data});
        })
    }
}
export default ListItem;