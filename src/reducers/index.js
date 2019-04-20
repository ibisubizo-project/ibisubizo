import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import usersReducer from './users'
import problems from './problems'
import commentReducer from './comments'

const rootReducer = combineReducers({
    problems,
    usersReducer,
    commentReducer,
    formReducer
})

export default rootReducer