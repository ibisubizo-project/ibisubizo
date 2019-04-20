import { actionTypes } from '../actions/actions'

let initialState = {
  loading: false,
  error: '',
  comment: {}
}
const commentReducers = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADDING_COMMENT:
      return {...state, loading: true}
    case actionTypes.ADDING_COMMENT_SUCCESS:
      return {...state, loading: false, comment: action.payload}
    case actionTypes.ADDING_COMMENT_FAILURE:
      return {...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default commentReducers