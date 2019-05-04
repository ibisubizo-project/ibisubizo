import actions from "./actions";
import problemsApi from "../services/problemsApi";


export const loadProblems = (page = 1) => dispatch => {
    dispatch(actions.fetchingProblems())
    return problemsApi.getAllApprovedProblems(page)
    // return problemsApi.getAllApprovedProblems(page).then((response) => {
    //     dispatch(actions.fetchingProblemsSuccess(response));
        
    // }).catch((error) => {
    //     console.log(error);
    //     dispatch(actions.fetchingProblemsFailure(error));
    // })
}



export const loadUsersProblem = (user_id) => dispatch => {
    dispatch(actions.fetchingUserProblems())
    return problemsApi.getAllUsersProblems(user_id)
    // problemsApi.getAllUsersProblems(user_id).then((response) => {
    //     console.dir(response)
    //     dispatch(actions.fetchingUserProblemsSuccess(response))
    // }).catch((error) => {
    //     console.log(error)
    //     dispatch(actions.fetchingUserProblemsFailure(error))
    // })
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

