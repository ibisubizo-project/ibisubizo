import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addComment } from '../actions/comments'
import { addLike } from '../actions/likes'
import TimeAgo from 'react-timeago'
import actions from '../actions/actions'
import problemsApi from '../services/problemsApi'
import commentsApi from '../services/commentApi'
import likesApi from '../services/likesApi'
import userApi from '../services/users'
import { Twitter, Facebook } from 'react-social-sharing'

class DetailComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            problem : {},
            comments: [],
            likes: [],
            comment: '',
            postedBy: '',
            hasLiked: false,
            featuredProblems: [],
            error: ''
        } 

        this.updateLike = this.updateLike.bind(this)
        this.evaluateLikeState = this.evaluateLikeState.bind(this)
    }

    updateLike(problemId) {
        const userLocalStorage = JSON.parse(localStorage.getItem("userData"))
        const { match: { params } } = this.props;

        if(!this.props.userIsAuthenticated) {
            alert("Please sign in to comment and like posts")
            return
        } else {
            if(this.state.hasLiked) {
                const userLike = {}
                userLike.problem_id = params.id
                userLike.liked_by = userLocalStorage._id
                likesApi.RemoveLike(this.props._id, userLocalStorage._id).then(result => {
                    this.state.likes.map((item, index) => {
                        if(item.liked_by === userLocalStorage._id) {
                            this.state.likes.splice(index, 1)
                        }
                    })
                    this.setState({hasLiked: !this.state.hasLiked})
                }).catch(error => {
                    console.error(error)
                })
            } else {
                //If the user has not liked te post before and clicked the like button
                //-Add the like to the database (They just liked the post )
                const like = {}
                like.problem_id = params.id
                like.liked_by = userLocalStorage._id

                likesApi.AddLike(like).then(result => {
                    this.setState({likes: [...this.state.likes, like], hasLiked: !this.state.hasLiked})
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault()
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
        //For the sideBAR Listings
        let problems = problemsApi.getProblem(params.id)
        problemsApi.getAllApprovedProblems().then(result => this.setState({featuredProblems: result})).catch(error => this.setState({error: error}))
        let comments =  commentsApi.ListAllPostComments(params.id)
        let likes  = likesApi.GetAllLikes(params.id)
        Promise.all([problems, comments, likes]).then(result => {
            this.props.setSelectedProblemsComments(result[1])
            this.props.setSelectedProblemsLikes(result[2])

            userApi.GetUserById(result[0].created_by).then(userData => {
                let { firstname, lastname } = userData;
                let name = `${firstname} ${lastname}`;
                this.setState({postedBy: name})
            }).catch(error => this.setState({error: error}));
            result[2].map(like => {
                const userLocalStorage = JSON.parse(localStorage.getItem("userData"))
                if(like.liked_by === userLocalStorage._id) {
                    this.setState({hasLiked: true})
                }
            })
            this.setState({problem: result[0], isLoading: false, likes: result[2]})
        }).catch(error => {
            console.error(error)
            this.setState({isLoading: false})
        });
    }

    evaluateLikeState(data) {
        data.map(like => {
            const userLocalStorage = JSON.parse(localStorage.getItem("userData"))
            if(like.liked_by === userLocalStorage._id) {
                this.setState({hasLiked: true})
            }
        })
    }

    render() {
        const { match: { params } } = this.props;
        if(this.state.isLoading) {
            return <div>Loading...</div>
        }

        let problemListing = this.state.featuredProblems.slice(0, 20)
        let renderPostImage = null
        if(this.state.problem.pictures !== undefined) {
            renderPostImage = (this.state.problem.pictures.length > 0) ? <p><a href={this.state.problem.pictures[0]}><img src={this.state.problem.pictures[0]} alt="Upload" className="border border-solid border-grey-light rounded-sm" /></a></p> : '';
        }
        
        return (
            <div className="container m-auto p-8 text-grey-darkest flex">
              <div className="w-3/5 px-6 py-4">
                {/*  */}
                <div className="flex border-b border-solid border-grey-light">
                    <div className="w-full p-3 pl-0">
                        <div className="flex justify-between">
                            <div className="flex justify-between">
                                <span className="font-bold">{this.state.postedBy}</span>
                                <span className="text-grey-dark"><TimeAgo date={new Date(this.state.problem.created_at)} /></span>
                            </div>
                            <div>
                                <span href="#" className="text-grey-dark hover:text-teal"><i className="fa fa-chevron-down"></i></span>
                            </div>
                        </div>

                        <div>
                            <div className="mb-4">
                                <p className="mb-6 font-bold">{this.state.problem.title}</p>
                                <p className="mb-4">{this.state.problem.text}</p>
                                {renderPostImage}
                            </div>
                            <div className="pb-2 mb-10">
                                <span className="mr-8 text-grey-dark no-underline hover:no-underline hover:text-blue-light">
                                    <i className="fa fa-comment fa-lg mr-2"></i>{this.props.selectedProblemsComments.length}
                                </span>
                                <span 
                                    onClick={(e) => this.updateLike(params.id)}
                                    className="mr-8 text-grey-dark no-underline hover:no-underline hover:text-green">
                                    <i className="fa fa-heart fa-lg mr-2"></i> {this.state.likes.length}
                                </span>
                                <span className="mr-8 text-grey-dark no-underline hover:no-underline hover:text-blue-light">
                                    <Twitter link={`http://ibisubizo.com/problem/${params.id}`} />
                                </span>
                                <span className="mr-8 text-grey-dark no-underline hover:no-underline hover:text-blue-light">
                                    <Facebook link={`http://ibisubizo.com/problem/${params.id}`} />
                                </span>
                            </div>
                        </div>

                        <div>
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

                        <div className="comments mt-6 border-grey-lighter">
                            {this.props.selectedProblemsComments.map((comments, index) => (
                                <div key={index} className="bg-white p-5 mb-4">
                                    {comments.comment}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/*  */}
              </div>

              <div className="2/5 mt-10">
                  <h1>Problem Listing</h1>
                  {!this.state.featuredProblems && <p>No Problem Listing</p>}
                  {problemListing.map(problem => (
                      <a href={`/problem/${problem._id}`} className="no-underline text-black font-bold">
                        <div className="h-16 bg-white p-2 mb-2 mt-2">
                            {problem.title}
                        </div>
                      </a>
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
        userIsAuthenticated: state.usersReducer.isAuthenticated
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