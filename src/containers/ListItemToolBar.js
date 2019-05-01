import React, {Component} from 'react'
import { Twitter, Facebook } from 'react-social-sharing'
import axios from 'axios'

class ListItemToolBar extends Component {
    state = {
        isFetching: false,
        comments: {},
        commentCount: 0
    }
    componentDidMount() {
        const problemId = this.props.problem_id;
        //Get all the comments for this post
        this.setState({isFetching: true})
        axios.get(`http://localhost:8000/api/comments/${problemId}/all`).then(response => {
            console.dir(response);
            this.setState({comments: response.data, commentCount: response.data.length, isFetching: false})
        }).catch(error => {
            console.log(error);
            this.setState({isFetching: false})
        });

    }

    render() {
        if(this.state.isFetching) {
            return <div>Loading....</div>
        }

        return (
            <div className="px-6 py-4">
                <div>
                    <span onClick={(e) => console.log(`You want to comment on post ${this.props.problem_id}`)}
                        className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <i className="fa fa-comment fa-lg mr-2"></i>{this.state.comments.length}
                    </span>
                    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <i className="fa fa-heart fa-lg mr-2"></i> 56
                    </span>
                    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker flex">
                        <Twitter link={`http://localhost:3000/problem/${this.props.problem_id}`} />
                        <Facebook link={`http://localhost:3000/problem/${this.props.problem_id}`} />
                    </span>
                </div>
            </div>
        )
    }
}


export default ListItemToolBar;