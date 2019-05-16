import ApiService from "./Api";


const BASE_URL = 'http://46.101.146.153:8000/api'
const client = new ApiService({ baseURL: BASE_URL });

const likesApi = {};


likesApi.AddLike = (like) => client.post('/likes/add/to/problem', like )
likesApi.GetAllLikes = (postId) => client.get(`/likes/${postId}`)
likesApi.RemoveLikeFromProblem = (like) => client.delete('/likes/remove/from/problem', like)
likesApi.RemoveLike = (problemId, likedBy) => client.delete(`/likes/remove/${problemId}/${likedBy}`)


export default likesApi;
