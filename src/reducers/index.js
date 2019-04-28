import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import usersReducer from './users'
import problems from './problems'
import commentReducer from './comments'
import likesReducer from './likes'

const rootReducer = combineReducers({
    problems,
    usersReducer,
    commentReducer,
    likesReducer,
    formReducer
})

export default rootReducer