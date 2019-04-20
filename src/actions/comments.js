import actions from './actions'
import UserProfile from '../utils/userProfile';
import userApi from '../services/users';
import history from '../history'
import commentApi from '../services/commentApi';


export const addComment =  (postId, comment) => {
	return dispatch => {
        dispatch(actions.addingComment())
        commentApi.AddComment(postId, comment).then(response => {
            console.log(response)
            actions.addingCommentSuccess(response)
        }).catch(error => {
            console.log(error)
            dispatch(actions.addingCommentFailure(error))
        })
    }
}

export const fetchingComments = (postId) => {
	return dispatch =>  {
        dispatch(actions.fetchingComments())
        commentApi.ListAllPostComments(postId).then(response => {
            console.log(response)
            dispatch(actions.fetchingCommentsSuccess(response))
        }).catch(error => {
            console.log(error)
            dispatch(actions.fetchingCommentsFailure(error))
        })
    }
}