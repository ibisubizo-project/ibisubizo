import actions from "./actions";
import problemsApi from "../services/problemsApi";


export const loadProblems = () => dispatch => {
    dispatch(actions.fetchingProblems())
    problemsApi.getAllApprovedProblems().then((response) => {
        dispatch(actions.fetchingProblemsSuccess(response));
        //dispatch({type: 'FETCHING_PROBLEMS_SUCCESS', payload: response});
    }).catch((error) => {
        console.log(error);
        dispatch(actions.fetchingProblemsFailure(error));
    })
}



export const loadUsersProblem = (user_id) => dispatch => {
    dispatch(actions.fetchingUserProblems())
    problemsApi.getAllUsersProblems(user_id).then((response) => {
        console.dir(response)
        dispatch(actions.fetchingUserProblemsSuccess(response))
    }).catch((error) => {
        console.log(error)
        dispatch(actions.fetchingUserProblemsFailure(error))
    })
}


export const addProblem = (problem) => dispatch => {
    dispatch(actions.addingProblem());
    problemsApi.addProblem(problem).then((response) => {
        dispatch(actions.addingProblemSuccess(response));
    }).catch((error) => {
        console.log(error);
        dispatch(actions.addingProblemFailure(error));
    });
}

