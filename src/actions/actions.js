import { buildActionCreator } from '../utils/index'


export const actionTypes = {
    FETCHING_PROBLEMS: 'FETCHING_PROBLEMS',
    FETCHING_PROBLEMS_SUCCESS: 'FETCHING_PROBLEMS_SUCCESS',
    FETCHING_PROBLEMS_FAILURE: 'FETCHING_PROBLEMS_FAILURE',
    ADDING_PROBLEM: 'ADDING_PROBLEM',
    ADDING_PROBLEM_SUCCESS: 'ADDING_PROBLEM_SUCCESS',
    ADDING_PROBLEM_FAILURE : 'ADDING_PROBLEM_FAILURE',
    AUTH_USER :  "AUTH_USER",
    UNAUTH_USER :  "UNAUTH_USER",
    AUTH_ERROR :  "AUTH_ERROR",
    FETCHING_USER :  "FETCHING _USER",
    FETCHING_USER_FAILURE :  "FETCHING_USER_FAILURE",
    FETCHING_USER_SUCCESS :  "FETCHING_USER_SUCCESS"
}


const actions = {
    fetchingProblems: buildActionCreator(actionTypes.FETCHING_PROBLEMS),
    addingProblem: buildActionCreator(actionTypes.ADDING_PROBLEM),
    fetchingUser: buildActionCreator(actionTypes.FETCHING_USER),
    unauthUser: buildActionCreator(actionTypes.UNAUTH_USER),
    addingProblemSuccess: (payload) => {
        return {
            type: actionTypes.ADDING_PROBLEM_SUCCESS,
            payload: payload
        }
    },
    addingProblemFailure: (payload) => {
        return {
            type: actionTypes.ADDING_PROBLEM_FAILURE,
            payload: payload
        }
    },
    fetchingProblemsSuccess: (payload) => {
        return {
            type: actionTypes.FETCHING_PROBLEMS_SUCCESS,
            payload: payload
        }
    },
    fetchingProblemsFailure: (error) => {
        return {
            type: actionTypes.FETCHING_PROBLEMS_FAILURE,
            payload: error
        }
    },
    fetchingUserSuccess: (user) => ({
        type: actionTypes.FETCHING_USER_SUCCESS,
        payload: user
    }),
    fetchingUserFailure: (error) => ({
        type: actionTypes.FETCHING_USER_FAILURE,
        payload: error
    }),
    authenticateUser: (user) => ({
        type: actionTypes.AUTH_USER,
        payload: user
    }),
    authenticationError: (error) => ({
        type: actionTypes.AUTH_ERROR,
        payload: error
    })
}

export default actions;