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

