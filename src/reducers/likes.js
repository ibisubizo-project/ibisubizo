import { actionTypes } from '../actions/actions'

let initialState = {
  loading: false,
  error: '',
  likes: []
}
const likesReducers = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADDING_LIKE:
      return {...state, loading: true}
    case actionTypes.ADDING_LIKE_SUCCESS:
      return {...state, loading: false, likes: action.payload}
    case actionTypes.ADDING_LIKE_FAILURE:
      return {...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default likesReducers