import { buildActionCreator } from '../utils/index'


export const actionTypes = {
    FETCHING_PROBLEMS: 'FETCHING_PROBLEMS',
    FETCHING_PROBLEMS_SUCCESS: 'FETCHING_PROBLEMS_SUCCESS',
    FETCHING_PROBLEMS_FAILURE: 'FETCHING_PROBLEMS_FAILURE'
}


const actions = {
    fetchingProblems: buildActionCreator(actionTypes.FETCHING_PROBLEMS),
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