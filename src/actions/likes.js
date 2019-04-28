import actions from "./actions";
import likesApi from "../services/likesApi";



export const addLike =  (like) => {
	return dispatch => {
        dispatch(actions.addingLikes())
        likesApi.AddLike(like).then(response => {
            console.log(response)
            actions.addingLikeSuccess(response)
        }).catch(error => {
            console.log(error)
            dispatch(actions.addingLikeFailure(error))
        })
    }
}