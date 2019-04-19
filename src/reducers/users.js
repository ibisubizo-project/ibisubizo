import actions from '../actions/actions'
import UserProfile from '../utils/userProfile'
import userApi from '../services/users'


const initialState = {
	isFetching: false,
	error: '',
	isAuthenticated: false,
	authedUser: {}
}


//Reducers 
export default function usersReducer ( state = initialState, action) {
	switch( action.type) {
		case actions.AUTH_USER: 
			return {...state, isAuthenticated: true, authedUser: action.user}
		case actions.UNAUTH_USER:
			return {...state, isAuthenticated: false, authedUser: {}}
		case actions.AUTH_ERROR: 
			return {...state, error: action.error}
		case actions.FETCHING_USER:
			return {...state, isFetching: true}
		case actions.FETCHING_USER_FAILURE:
			return {...state, isFetching: false,isAuthenticated: false, error: action.error }
		case actions.FETCHING_USER_SUCCESS:
			return action.user == null 
				? { ...state, isFetching: false ,error: ''}
				: {...state, isFetching: false, error: '', authedUser: action.user }
		default:
				return state
	}
}

export function logoutUser() {
	return dispatch => {
		localStorage.removeItem('token')
		dispatch(actions.unauthUser());
	};
}

export function login (form) {
	return dispatch => userApi.Login(form)
		.then((response) => {
			dispatch(actions.authenticateUser(response.data.user))
			localStorage.setItem('token', response.data.token)
			UserProfile.setUserData(response.data.user)
			dispatch(actions.fetchingUserSuccess(response.data.user))
			//return history.push('/') //GOTO: Homepage
		})
		.catch((err) => {
			let error = err
			return dispatch(actions.authenticationError(error));
		})
}

export function register(credentials) {
	return dispatch => userApi.Register(credentials)
		.then((response) => {
			dispatch(actions.authenticateUser(response.data.user))
			localStorage.setItem("token", response.data.token)
			UserProfile.setUserData(response.data.user)
			dispatch(actions.fetchingUserSuccess(response.data.user))
			//return history.push('/')
		})
		.catch((err) => {
			let error = err
			return dispatch(actions.authenticationError(error));
		})
}