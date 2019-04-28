import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addComment } from '../actions/comments'
import { addLike } from '../actions/likes'
import TimeAgo from 'react-timeago'
import actions from '../actions/actions'
import problemsApi from '../services/problemsApi'
import commentsApi from '../services/commentApi'
import likesApi from '../services/likesApi'

class DetailComponent extends Component {

    state = {
        isLoading: false,
        problem : {},
        comments: [],
        comment: '',
        isLiked: false,
    }

    onHandleLike() {
        const { match: { params } } = this.props;

        const problemId = params.id;
        let loggedInUser = localStorage.getItem("userData");
        let userId = JSON.parse(loggedInUser)._id;

        let payload = {};
        payload.problem_id = problemId;
        payload.liked_by = userId;

        console.dir(payload)
        this.props.addLike(payload);
        this.props.selectedProblemsLikes.unshift(payload)
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.props)
        const { match: { params } } = this.props;
        if(this.state.comment.length < 2) return;
        let problemId = params.id;
        let loggedInUser = localStorage.getItem("userData");
        let userId = JSON.parse(loggedInUser)._id;
        let comment = {
          post_id: problemId,
          user_id: userId,
          comment:  this.state.comment
        }

        this.props.addCommentToPost(problemId, comment)
        this.props.selectedProblemsComments.unshift(comment)
        this.setState({comment: ''})
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        this.setState({isLoading: true})
        let problems = problemsApi.getProblem(params.id)
        let comments =  commentsApi.ListAllPostComments(params.id)
        let likes  = likesApi.GetAllLikes(params.id)


        Promise.all([problems, comments, likes]).then(result => {
            console.dir(result)
            this.props.setSelectedProblemsComments(result[1])
            this.props.setSelectedProblemsLikes(result[2])
            this.setState({problem: result[0], isLoading: false})
        }).catch(error => {
            console.error(error)
            this.setState({isLoading: false})
        });

    }

    render() {
        const { match: { params } } = this.props;
        if(this.state.isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div className="problem__detail container mx-auto">
                <div className="flex justify-between">
                    <div>{this.state.problem.title}</div>
                    <TimeAgo date={new Date(this.state.problem.created_at)} />
                </div>

                <div>
                    {this.state.problem.text}
                </div>

                <div className="px-6 py-4">
                    <div>
                        <span onClick={(e) => console.log(`You want to comment on post ${params.id}`)}
                            className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                            <i className="fa fa-comment fa-lg mr-2"></i>{this.props.selectedProblemsComments.length}
                        </span>
                        <span
                            onClick={this.onHandleLike.bind(this)}
                            className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                            <i className="fa fa-heart fa-lg mr-2"></i> {this.props.selectedProblemsLikes.length}
                        </span>
                        <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
                            <i className="fa fa-share fa-lg mr-2"></i> 247
                        </span>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            className="w-full h-8 p-4"
                            type="text"
                            name='comment'
                            value={this.state.comment}
                            onChange={(e) => {
                                this.setState({comment: e.target.value})
                            }}
                            placeholder="Add your comment" />
                    </form>
                </div>

                <div className="comments">
                    {this.props.selectedProblemsComments.map(comments => (
                        <div key={comments._id}>
                            {comments.comment}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        selectedProblemsComments: state.problems.selectedProblemsComments,
        selectedProblemsLikes: state.problems.selectedProblemsLikes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      addCommentToPost: (postId, comment) => dispatch(addComment(postId, comment)),
      addLike: (like) => dispatch(addLike(like)),
      setSelectedProblemsComments: (comments) => dispatch(actions.currentSelectedProblemsComments(comments)),
      setSelectedProblemsLikes: (likes) => dispatch(actions.currentSelectedProblemsLikes(likes))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent)