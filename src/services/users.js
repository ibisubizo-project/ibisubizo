import ApiService from "./Api";

const client = new ApiService({});

const userApi = {};


userApi.Login = (credentials) => client.post('/auth/login', credentials)
userApi.Register = (credentials) => client.post('/auth/register', credentials)
userApi.GetUserById = (userId) => client.get(`/users/${userId}`)
userApi.ForgetPassword = (payload) => client.post(`/users/forget`, payload)
userApi.ConfirmToken = (resetToken, payload) => client.post(`/users/confirmation/${resetToken}`, payload)
userApi.ChangePassword = (resetToken, payload) => client.post(`/users/changepassword?token=${resetToken}`, payload)


export default userApi;
