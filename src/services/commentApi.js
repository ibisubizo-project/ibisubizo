import ApiService from "./Api";

const client = new ApiService({});

const commentApi = {};


commentApi.AddComment = (postId, comment) => client.post(`/comments/${postId}`, comment)
commentApi.GetPublicComments = (postId) => client.get(`/comments/${postId}/public`)
commentApi.ListAllPostComments = (postId) => client.get(`/comments/${postId}/all`)
commentApi.GetAllUnapprovedComments = () => client.get('/comments/unapproved')


export default commentApi;
