import ApiService from "./Api";


const BASE_URL = 'http://localhost:8000/api'
const client = new ApiService({ baseURL: BASE_URL });

const problemsApi = {};

const getPageSlice = (limit, page = 0) => ({ begin: page * limit, end: (page + 1) * limit });
const getPageValues = ({ begin, end, items }) => items.slice(begin, end);


problemsApi.getAllApprovedProblems = (page = 0) => client.get(`/problems/approved?page=${page}`)
problemsApi.getAllProblems = (page = 0) => client.get(`/problems?page=${page}`)
problemsApi.getProblem = (problem_id) => client.get(`/problems/${problem_id}`)
problemsApi.getAllUsersProblems = (user_id, page) => client.get(`/problems/user/${user_id}?page=${page}`)
problemsApi.addProblem = (problem) => client.post('/problems/', problem)

export default problemsApi;
