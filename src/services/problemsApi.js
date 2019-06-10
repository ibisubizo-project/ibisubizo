import ApiService from "./Api";


const client = new ApiService({});

const problemsApi = {};

problemsApi.getAllApprovedProblems = (page = 0) => client.get(`/problems/approved?page=${page}`)
problemsApi.getAllProblems = (page = 1) => client.get(`/problems?page=${page}`)
problemsApi.getProblem = (problem_id) => client.get(`/problems/${problem_id}`)
problemsApi.getAllUsersProblems = (user_id, page) => client.get(`/problems/user/${user_id}?page=${page}`)
problemsApi.addProblem = (problem) => client.post('/problems/', problem)
problemsApi.deleteProblem = (problem_id) => client.delete(`/problems/${problem_id}`)
problemsApi.updateProblem = (problem_id, user_id, update) => client.put(`/problems/${problem_id}/${user_id}`, update)

export default problemsApi;
