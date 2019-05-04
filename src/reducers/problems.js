import { actionTypes } from "../actions/actions";


const initialState = {
    loading : false,
    problems: [],
    userProblems: [],
    selectedProblem: {},
    selectedProblemsComments: [],
    selectedProblemsLikes: [],
    error: ''
};

const problems = (state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.FETCHING_PROBLEMS:
            return {...state, loading: true}
        case actionTypes.FETCHING_USER_PROBLEMS:
            return {...state, loading: true}
        case actionTypes.FETCHING_USER_PROBLEMS_SUCCESS:
            return {...state, loading: false, userProblems: action.payload}
        case actionTypes.FETCHING_USER_PROBLEMS_FAILURE:
            return {...state, loading: false, error: action.payload}
        case actionTypes.FETCHING_PROBLEMS_SUCCESS:
            console.log(action.payload)
            return { ...state, loading: false, problems: action.payload}
        case actionTypes.FETCHING_PROBLEMS_FAILURE:
            return { ...state, loading: false, error: action.payload}
        case actionTypes.ADDING_PROBLEM:
            return {...state, loading: true}
        case actionTypes.ADDING_PROBLEM_SUCCESS:
            return {...state, loading: false}
        case actionTypes.ADDING_PROBLEM_FAILURE:
            return {...state, loading: false, error: action.payload}
        case actionTypes.SELECTED_PROBLEM:
            return {...state, selectedProblem: action.payload}
        case actionTypes.SELECTED_PROBLEMS_COMMENTS:
            return {...state, selectedProblemsComments: action.payload}
        case actionTypes.SELECTED_PROBLEMS_LIKES:
            return {...state, selectedProblemsLikes: action.payload}
        case actionTypes.ON_LOAD_MORE_SUCCESS:
            return {...state, problems: [...state.problems, action.payload.problems]}
        default:
            return state
    }
}


export default problems;