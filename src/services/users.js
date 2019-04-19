import ApiService from "./Api";


const BASE_URL = 'http://localhost:8000/api'
const client = new ApiService({ baseURL: BASE_URL });

const userApi = {};


userApi.Login = (credentials) => client.post('/auth/login', credentials)
userApi.Register = (credentials) => client.post('/auth/register', credentials)


export default userApi;
