import ApiService from "./Api";

const client = new ApiService({});

const commentApi = {};


commentApi.AddComment = (postId, comment) => client.post(`/comments/${postId}`, comment)
commentApi.GetPublicComments = (postId) => client.get(`/comments/${postId}/public`)
commentApi.ListAllPostComments = (postId) => client.get(`/comments/${postId}/all`)
commentApi.GetAllUnapprovedComments = () => client.get('/comments/unapproved')
commentApi.Remove = (commentId) => client.delete(`/comments/${commentId}`)
commentApi.ApproveComment = (commentId) => client.put(`/comments/${commentId}/approve`)


export default commentApi;
