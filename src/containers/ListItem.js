import React, {Component} from 'react';
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ListItemToolBar from './ListItemToolBar';
import AddCommentToolBar from './AddCommentToolBar';
import history from '../history';
import actions from '../actions/actions'
import commentApi from '../services/commentApi';
import likesApi from '../services/likesApi'

class ListItem extends Component {
    state = {
        created_by: {},
        reRender: false,
        comments: [],
        likes: [],
        hasLiked: false
    }

    componentWillMount() {
        const comments = commentApi.ListAllPostComments(this.props._id)
        const likes = likesApi.GetAllLikes(this.props._id)

        Promise.all([comments, likes])
        .then(result => {
            this.setState({comments: result[0], likes: result[1]})
        })

        this.state.likes.map(like => {
            const userLocalStorage = JSON.parse(localStorage.getItem("userData"))
            if(like.liked_by === userLocalStorage._id) {
                //USER has already liked this problem
                this.setState({hasLiked: true})
            }
        })
    }

    updateComment(comment) {
        this.setState({comment: this.state.comments.push(comment)})
    }

    updateLike(likeId) {
        console.log("WE are here...")
        const userLocalStorage = JSON.parse(localStorage.getItem("userData"))

        if(!this.props.userIsAuthenticated) {
            alert("Please sign in to comment and like posts")
            return
        } else {
            console.log("Else...[]")
            //If the user has already liked this problem
            //Toggle the state
            //If the user already liked the problem and clicked the like button
            if(this.state.hasLiked) {
                //-Remove the like from the database(They are no longer liking the post)
                console.log("You already liked this post, removing...")
                const userLike = {}
                userLike.problem_id = this.props._id
                userLike.liked_by = userLocalStorage._id
                likesApi.RemoveLike(this.props._id, userLocalStorage._id).then(result => {
                    const newLikesArray = this.state.likes.filter(object => {
                        return object.id === likeId
                    })
                    console.log("[newLikesArray]")
                    console.log(newLikesArray)
                    this.setState({likes: newLikesArray, hasLiked: !this.state.hasLiked})
                }).catch(error => {
                    console.dir(userLike)
                    console.log(error)
                })
            } else {
                //If the user has not liked te post before and clicked the like button
                //-Add the like to the database (They just liked the post )
                const like = {}
                like.problem_id = this.props._id
                like.liked_by = userLocalStorage._id
                like.id = likeId

                likesApi.AddLike(like).then(result => { 
                    console.log("[AddLike]")
                    console.dir(like)
                    this.setState({likes: [...this.state.likes, like], hasLiked: !this.state.hasLiked})
                }).catch(error => {
                    console.log("[AddLike] Logging error")
                    console.error(error)
                })
            }
        }
    }

    viewProblemDetails(evt) {
        evt.preventDefault()
        if(!this.props.userIsAuthenticated) { alert("Please Login..."); return; }
        this.props.setSelectedProblem(this.props.problem)
        history.push(`/problem/${this.props._id}`)
    }

    render() {
        const {_id, title, text, created_at, updated_at, created_by, pictures, videos, documents, is_approved, status} = this.props;
        const localStorageUserData = localStorage.getItem("userData")
        let renderedImage = null
        if(pictures !== undefined){
            renderedImage = (pictures.length > 0) ? <p><a href={pictures[0]}><img src={pictures[0]} alt="Upload" className="border border-solid border-grey-light rounded-sm w-full" /></a></p> : ''
        }

        return (
            <div className="rounded overflow-hidden shadow-lg mb-6">
                <div className="px-6 py-6" onClick={this.viewProblemDetails.bind(this)}>
                    <div className="font-bold mb-2 flex justify-between">
                        {title}
                        <TimeAgo date={new Date(created_at)} />
                    </div>
                    <p className="text-grey-darker text-base">
                        {text}
                    </p>
                    {renderedImage}
                </div>

                <ListItemToolBar problem_id={_id} comments={this.state.comments} likes={this.state.likes} updateLike={this.updateLike.bind(this)} />
                {localStorageUserData ? <AddCommentToolBar updateComment={this.updateComment.bind(this)}  problem_id={_id} user_data={JSON.parse(localStorageUserData)} /> : '' }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.dir(state);
    return {
        selectedProblem: state.problems.selectedProblem,
        userIsAuthenticated: state.usersReducer.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => ({
    setSelectedProblem: (problem) => dispatch(actions.currentSelectedProblem(problem))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);