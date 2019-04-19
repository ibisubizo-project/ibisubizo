import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import usersReducer from './users'
import problems from './problems'

const rootReducer = combineReducers({
    problems,
    usersReducer,
    formReducer
})

export default rootReducer