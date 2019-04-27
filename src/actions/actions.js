import { buildActionCreator } from '../utils/index'

export const actionTypes = {
    FETCHING_PROBLEMS: 'FETCHING_PROBLEMS',
    FETCHING_USER_PROBLEMS: 'FETCHING_USER_PROBLEMS',
    FETCHING_USER_PROBLEMS_SUCCESS: 'FETCHING_USER_PROBLEMS_SUCCESS',
    FETCHING_USER_PROBLEMS_FAILURE: 'FETCHING_USER_PROBLEMS_FAILURE',
    FETCHING_PROBLEMS_SUCCESS: 'FETCHING_PROBLEMS_SUCCESS',
    SELECTED_PROBLEM: 'SELECTED_PROBLEM',
    SELECTED_PROBLEMS_COMMENTS: 'SELECTED_PROBLEMS_COMMENTS',
    FETCHING_PROBLEMS_FAILURE: 'FETCHING_PROBLEMS_FAILURE',
    ADDING_PROBLEM: 'ADDING_PROBLEM',
    ADDING_PROBLEM_SUCCESS: 'ADDING_PROBLEM_SUCCESS',
    ADDING_PROBLEM_FAILURE : 'ADDING_PROBLEM_FAILURE',
    AUTH_USER :  'AUTH_USER',
    UNAUTH_USER :  'UNAUTH_USER',
    AUTH_ERROR :  'AUTH_ERROR',
    FETCHING_USER :  'FETCHING _USER',
    FETCHING_USER_FAILURE :  'FETCHING_USER_FAILURE',
    FETCHING_USER_SUCCESS :  'FETCHING_USER_SUCCESS',
    ADDING_COMMENT: 'ADDING_COMMENT',
    ADDING_COMMENT_SUCCESS: 'ADDING_COMMENT_SUCCESS',
    ADDING_COMMENT_FAILURE: 'ADDING_COMMENT_FAILURE',
    FETCHING_COMMENTS : 'FETCHING_COMMENTS',
    FETCHING_COMMENTS_SUCCESS: 'FETCHING_COMMENTS_SUCCESS',
    FETCHING_COMMENTS_FAILURE: 'FETCHING_COMMENTS_FAILURE'
}


const actions = {
    //PROBLEMS
    fetchingProblems: buildActionCreator(actionTypes.FETCHING_PROBLEMS),
    fetchingUserProblems: buildActionCreator(actionTypes.FETCHING_USER_PROBLEMS),
    addingProblem: buildActionCreator(actionTypes.ADDING_PROBLEM),
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
    currentSelectedProblem: (payload) => {
        return {
            type: actionTypes.SELECTED_PROBLEM,
            payload
        }
    },
    currentSelectedProblemsComments: (comments) => {
        return {
            type: actionTypes.SELECTED_PROBLEMS_COMMENTS,
            payload: comments
        }
    },
    fetchingProblemsFailure: (error) => {
        return {
            type: actionTypes.FETCHING_PROBLEMS_FAILURE,
            payload: error
        }
    },
    fetchingUserProblemsSuccess: (problems) => ({
        type: actionTypes.FETCHING_USER_PROBLEMS_SUCCESS,
        payload: problems
    }),
    fetchingUserProblemsFailure: (error) => ({
        type: actionTypes.FETCHING_USER_PROBLEMS_FAILURE,
        payload: error
    }),
    //USERS
    fetchingUser: buildActionCreator(actionTypes.FETCHING_USER),
    unauthUser: buildActionCreator(actionTypes.UNAUTH_USER),
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
    }),
    //COMMENTS
    addingComment: buildActionCreator(actionTypes.ADDING_COMMENT),
    addingCommentSuccess: (comment) => ({
        type: actionTypes.ADDING_COMMENT_SUCCESS,
        payload: comment
    }),
    addingCommentFailure: (error) => ({
        type: actionTypes.ADDING_COMMENT_FAILURE,
        payload: error
    }),
    fetchingComments: buildActionCreator(actionTypes.FETCHING_COMMENTS),
    fetchingCommentsSuccess: (comment) => ({
        type: actionTypes.FETCHING_COMMENTS_SUCCESS,
        payload: comment
    }),
    fetchingCommentsFailure: (error) => ({
        type: actionTypes.FETCHING_COMMENTS_FAILURE,
        payload: error
    })
}

export default actions;