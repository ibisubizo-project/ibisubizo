import ApiService from "./Api";


const BASE_URL = 'http://46.101.146.153:8000/api'
const client = new ApiService({ baseURL: BASE_URL });

const userApi = {};


userApi.Login = (credentials) => client.post('/auth/login', credentials)
userApi.Register = (credentials) => client.post('/auth/register', credentials)
userApi.GetUserById = (userId) => client.get(`/users/${userId}`)


export default userApi;
