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
        likes: []
    }

    componentWillMount() {
        const comments = commentApi.ListAllPostComments(this.props._id)
        const likes = likesApi.GetAllLikes(this.props._id)

        Promise.all([comments, likes])
        .then(result => {
            this.setState({comments: result[0], likes: result[1]})
        })
    }

    updateComment(commentId) {
        this.setState({reRender: !this.state.reRender})
    }

    updateLike(likeId) {
        //Check if the signed in user has already liked this same post
        //If the user has liked the post, then unlike the post and decrement the like counter 
        //Else increase the counter of the like
        //this.setState({likes: })
        console.log("WE are here...")

        if(!this.props.userIsAuthenticated) {
            alert("Please sign in to comment and like posts")
            return
        } else {
            console.log("Else...[]")
            this.state.likes.map(item => {
                console.log("[MAP]")
                const localStorageUserData = JSON.parse(localStorage.getItem("userData"))
                if(item.liked_by === localStorageUserData._id) { //User liked this post, so we remove the like 
                    console.log("You already liked this post, decrement the count")
                    const like = {}
                    like.problem_id = this.props._id
                    like.liked_by = localStorageUserData._id
                    like.id = likeId
                    likesApi.RemoveLikeFromProblem(like).then(result => {
                        const newLikesArray = this.state.likes.filter( object => {
                            return object.id === like.id
                        })
                        console.log("[RemoveLikeFromProblem]")
                        console.dir(newLikesArray)
                        this.setState({likes: newLikesArray })
                    })
                } else { //User hasn't liked this post, so we add it
                    console.log("User hasn't like this post")
                    const like = {}
                    like.id = likeId
                    like.liked_by = localStorageUserData._id
                    like.problem_id = this.props._id
                    console.log(localStorageUserData)
                    console.dir(like)
                    likesApi.AddLike(like).then(result => { 
                        console.log("[AddLike]")
                        console.dir(like)
                        this.setState({like: [...this.state.likes, like]}) 
                    })
                }
            })
        }
        console.dir(this.state.likes)
        //alert("You are liking...")
    }

    viewProblemDetails(evt) {
        evt.preventDefault()
        if(!this.props.userIsAuthenticated) { alert("Please Login..."); return; }
        this.props.setSelectedProblem(this.props.problem)
        history.push(`/problem/${this.props._id}`)
    }

    render() {
        const {_id, title, text, created_at, updated_at, created_by, pictures, videos, documents, is_approved, status} = this.props;
        console.dir(this.props)
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