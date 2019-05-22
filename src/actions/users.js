import actions from './actions'
import UserProfile from '../utils/userProfile';
import userApi from '../services/users';
import history from '../history'


export const logoutUser = () =>{
	return dispatch => {
		localStorage.removeItem('token')
		dispatch(actions.unauthUser());
	};
}

export const login =  (form) => {
	return dispatch =>  {
		userApi.Login(form)
		.then((response) => {
			dispatch(actions.authenticateUser(response.user))
			localStorage.setItem('token', response.token)
			UserProfile.setUserData(response.user)
			dispatch(actions.fetchingUserSuccess(response.user))
			return history.push('/') //GOTO: Homepage
		})
		.catch((err) => {
			let error = err
			return dispatch(actions.authenticationError(error.response.data.error));
		})
	}
}

export function register(credentials) {
	return dispatch => userApi.Register(credentials)
		.then((response) => {
			dispatch(actions.authenticateUser(response.user))
			localStorage.setItem("token", response.token)
			UserProfile.setUserData(response.user)
			dispatch(actions.fetchingUserSuccess(response.user))
			return history.push('/')
		})
		.catch((err) => {
			let error = err
			return dispatch(actions.authenticationError(error.response.data.error));
		})
}