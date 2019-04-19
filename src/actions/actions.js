import { buildActionCreator } from '../utils/index'


export const actionTypes = {
    FETCHING_PROBLEMS: 'FETCHING_PROBLEMS',
    FETCHING_PROBLEMS_SUCCESS: 'FETCHING_PROBLEMS_SUCCESS',
    FETCHING_PROBLEMS_FAILURE: 'FETCHING_PROBLEMS_FAILURE',
    ADDING_PROBLEM: 'ADDING_PROBLEM',
    ADDING_PROBLEM_SUCCESS: 'ADDING_PROBLEM_SUCCESS',
    ADDING_PROBLEM_FAILURE : 'ADDING_PROBLEM_FAILURE'
}


const actions = {
    fetchingProblems: buildActionCreator(actionTypes.FETCHING_PROBLEMS),
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
    fetchingProblemsFailure: (error) => {
        return {
            type: actionTypes.FETCHING_PROBLEMS_FAILURE,
            payload: error
        }
    }
}

export default actions;