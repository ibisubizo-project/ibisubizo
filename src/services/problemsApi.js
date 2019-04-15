import ApiService from "./Api";


const BASE_URL = 'http://localhost:8000/api'
const client = new ApiService({ baseURL: BASE_URL });

const problemsApi = {};

const getPageSlice = (limit, page = 0) => ({ begin: page * limit, end: (page + 1) * limit });
const getPageValues = ({ begin, end, items }) => items.slice(begin, end);


problemsApi.getAllApprovedProblems = () => client.get('/problems/approved');
problemsApi.getAllProblems = () => client.get('/problems');

export default problemsApi;
