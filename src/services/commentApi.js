import ApiService from "./Api";


const BASE_URL = 'http://localhost:8000/api'
const client = new ApiService({ baseURL: BASE_URL });

const commentApi = {};


commentApi.AddComment = (postId, comment) => client.post(`/comments/${postId}`, comment)
commentApi.ListAllPostComments = (postId) => client.get(`/comments/${postId}/all`)


export default commentApi;
