import React, {Component} from 'react'
import { Twitter, Facebook } from 'react-social-sharing'

class ListItemToolBar extends Component {
    state = {
        isFetching: false,
        comments: {},
        commentCount: 0
    }

    render() {
        if(this.state.isFetching) {
            return <div></div>
        }

        return (
            <div className="p-0 sm:px-6 py-4">
                <div className="flex">
                    <span  onClick={(e) => console.log(`${this.props.problem_id}`)}
                        className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <i className="fa fa-comment fa-lg mr-2"></i>{this.props.comments.length}
                    </span>
                    <span
                        onClick={(e) => this.props.updateLike(this.props.problem_id)}
                        className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <i
                          className="fa fa-heart fa-lg mr-2">
                          </i>
                          {this.props.likes.length}
                    </span>
                    <span className="flex rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                        <Twitter link={`/problem/${this.props.problem_id}`} />
                        <Facebook link={`/problem/${this.props.problem_id}`} />
                    </span>
                </div>
            </div>
        )
    }
}


export default ListItemToolBar;
