import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addComment } from '../actions/comments'
import { addLike } from '../actions/likes'
import TimeAgo from 'react-timeago'
import actions from '../actions/actions'
import { confirmAlert } from 'react-confirm-alert';
import problemsApi from '../services/problemsApi'
import commentsApi from '../services/commentApi'
import likesApi from '../services/likesApi'
import userApi from '../services/users'
import { Twitter, Facebook } from 'react-social-sharing'
import { Redirect, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import metricsApi from '../services/metricsApi';


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
            error: '',
            redirectToLogin: false,
            first_name: '',
            last_name: '',
            redirectTo: ''
        }

        this.updateLike = this.updateLike.bind(this)
        this.evaluateLikeState = this.evaluateLikeState.bind(this)
        this.getLoggedInUser = this.getLoggedInUser.bind(this)
        this.fetchFreshData = this.fetchFreshData.bind(this)
        this.problemListing = this.problemListing.bind(this)
    }

    problemListing(problem_id) {
        window.location.href = `/problem/${problem_id}`
        // console.log(problem_id)
        // return <Redirect to={`/problem/${problem_id}`} />
    }

    updateLike(problemId) {
        const userLocalStorage = JSON.parse(localStorage.getItem("userData"))
        const { match: { params } } = this.props;

        if(!this.props.userIsAuthenticated) {
            this.setState({redirectToLogin: true})
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

    delete(comment){
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to delete this comment?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.deleteComment(comment._id)
            },
            {
              label: 'No',
              onClick: () => {
                return null;
              }
            }
          ]
        });
    };

    deleteComment(comment_id) {
        commentsApi.Remove(comment_id).then((result) => {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        })
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
        //this.props.selectedProblemsComments.unshift(comment)
        this.setState({comment: ''})
    }

    addMetrics(problemId) {
        let metrics = {}
        metrics.problem_id = problemId
        metricsApi.addProblemMetrics(metrics).then(result => {
            console.log("Metrics added...")
        }).catch(error => console.log("[Error] Unable to add metrics"))
    }

    componentDidMount() {
        if(this.state.redirectToLogin) {
          return <Redirect to='/auth/login' />
        }

        const { match: { params } } = this.props;
        this.fetchFreshData(params.id)
        this.getLoggedInUser();
        this.getProblemCurrentMetrics(params.id)
    }

    getProblemCurrentMetrics(problemId) {
        metricsApi.getProblemMetrics(problemId).then(result => {
            console.log(result)
            let visits = result.visits + 1
            let metrics = {
                problem_id: result.problem_id,
                visits: visits,
                year: result.year,
                month: result.month
            }
            metricsApi.updateProblemMetrics(problemId, metrics).then(result => {
                console.log(result)
                console.log("Previous metrics Updated")
            })

            //Update Metrics cos we just visited this page
        }).catch(error => {
            console.dir(error)
            if(error.response.status === 400) {
                //Build the metrics, cos its a new one
                let metrics = {}
                metrics.problem_id = problemId
                metrics.visits = 1
                metrics.year = new Date().getFullYear()
                metrics.month = new Date().getMonth() + 1 //JS displays months from 0 - 11, Golang goes from 1 - 12 

                metricsApi.addProblemMetrics(metrics).then(result => {
                    console.log("New Metrics Added..[First Visit]")
                })
            }
        })

    }

    fetchFreshData(problem_id) {
        this.setState({isLoading: true})
        let problems = problemsApi.getProblem(problem_id)
        problemsApi.getAllApprovedProblems().then(result => this.setState({featuredProblems: result})).catch(error => this.setState({error: error}))
        let comments = commentsApi.GetPublicComments(problem_id)
        let likes  = likesApi.GetAllLikes(problem_id)
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

    getLoggedInUser() {
        let loggedInUser = localStorage.getItem("userData");
        let userId = JSON.parse(loggedInUser)._id;
        userApi.GetUserById(userId).then(result => {
            console.log("Currently Logged in User: ")
            console.dir(result);
            this.setState({first_name: result.first_name, last_name: result.last_name});
        })
    }

    evaluateLikeState(data) {
        data.map(like => {
            const userLocalStorage = JSON.parse(localStorage.getItem("userData"))
            if(like.liked_by === userLocalStorage._id) {
                this.setState({hasLiked: true})
            }
        })
    }

    getTrashClassNames(comments) {
        let state = (this.props.authenticatedUser._id !== comments.user_id) ? " hidden" : " ";
        return `${state}`
    }

    render() {
        const { match: { params } } = this.props;
        if(this.state.isLoading) {
            return <div></div>
        }

        let problemListing = this.state.featuredProblems.slice(0, 20)
        let renderPostImage = null
        let renderedImage = null
        if(this.state.problem.pictures !== undefined) {
            renderPostImage = (this.state.problem.pictures.length > 0) ? <p><a href={this.state.problem.pictures[0]}><img src={this.state.problem.pictures[0]} alt="Upload" className="border border-solid border-grey-light rounded-sm" /></a></p> : '';
            renderedImage = this.state.problem.pictures[0]
        }

        let firstname = undefined;
        let lastname = undefined;

        if(this.props.authenticatedUser !== undefined) {
             firstname = this.props.authenticatedUser.firstname;
             lastname = this.props.authenticatedUser.lastname;
        }

        return (
            <div className="container m-auto p-8 text-grey-darkest flex">
              <Helmet>
                  <title>
                      {this.state.problem.title}
                  </title>
                  {this.state.problem.pictures !== undefined && (
                    <meta property="og:image" content={renderedImage} />
                  )}

                  {this.state.problem.pictures !== undefined && (
                    <meta property="twitter:image" content={renderedImage} />
                  )}
                  <meta name="twitter:title" content={this.state.problem.title} />
                  <meta property="og:title" content={this.state.problem.title} />

              </Helmet>
              <div className="w-full sm:w-4/5 md:w-4/5 py-4">
                <div className="flex">
                    <div className="w-full pl-0">
                        <div className="flex justify-between">
                            <div className="flex justify-between">
                                <div><span className="font-bold mr-12">{this.state.postedBy}</span></div>
                                <div><span className="text-grey-dark"><TimeAgo date={new Date(this.state.problem.created_at)} /></span></div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-4">
                                <p className="mb-6 font-bold">{this.state.problem.title}</p>
                                <p className="mb-4">{this.state.problem.text}</p>
                                {renderPostImage}
                            </div>

                            <div className="py-4">
                                <div className="flex">
                                    <span
                                        className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                                        <i className="fa fa-comment fa-lg mr-2"></i>{this.props.selectedProblemsComments.length}
                                    </span>
                                    <span
                                        onClick={(e) => this.updateLike(params.id)}
                                        className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                                        <i className="fa fa-heart fa-lg mr-2"></i> {this.state.likes.length}
                                    </span>
                                    <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                                        <Twitter solidcircle small message={this.state.problem.title} link={`http://bisubizo.com/problem/${params.id}`} />
                                    </span>
                                    <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
                                        <Facebook solidcircle small message={this.state.problem.title} link={`http://bisubizo.com/problem/${params.id}`} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                                <input
                                    className="w-full h-8 p-2"
                                    type="text"
                                    name='comment'
                                    value={this.state.comment}
                                    onChange={(e) => {
                                        this.setState({comment: e.target.value})
                                    }}
                                    autoComplete="off"
                                    placeholder="Add your comment" />
                            </form>
                        </div>

                        <div className="comments mt-6 border-grey-lighter">
                            {this.props.selectedProblemsComments.map((comments, index) => (
                                <div key={index} className="bg-white p-5 mb-4">
                                    <div className="flex justify-between">
                                        <div className="flex justify-between">
                                            <div className="flex">
                                                <p className="font-extrabold text-2xl">{`${firstname}, ${lastname}`}</p>
                                                {comments.is_admin && <span className="text-teal-400 mr-4 text-xs">ADMIN</span>}
                                            </div>
                                            <TimeAgo date={new Date(comments.commented_at)} />
                                        </div>
                                        <div className={this.getTrashClassNames(comments)}>
                                            <span className="mr-2 ">
                                                <i
                                                    onClick={() => this.delete(comments)}
                                                    className={`fa fa-trash cursor-pointer hover:bg-red-600 hover:text-white`}
                                                    aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        {comments.comment}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              </div>

              <div className="w-2/5 ml-4 mt-10 hidden sm:block md:block">
                  <h1 className="font-bold text-2xl">Trending Problems</h1>
                  <hr className="mb-2" />
                  {!this.state.featuredProblems && <p>No Problem Listing</p>}
                  {problemListing.map(problem => (
                      <div onClick={() => this.problemListing(problem._id)} key={problem._id} className="no-underline text-black font-bold cursor-pointer">
                        <div className="h-16 bg-white p-2 mb-2 mt-2">
                            {problem.title}
                        </div>
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
        userIsAuthenticated: state.usersReducer.isAuthenticated,
        authenticatedUser: state.usersReducer.authedUser
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
