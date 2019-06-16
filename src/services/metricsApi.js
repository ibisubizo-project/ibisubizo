import ApiService from "./Api";


const client = new ApiService({});

const metricsApi = {};

metricsApi.getProblemMetrics = (problemId) => client.get(`/metrics/${problemId}`)
metricsApi.addProblemMetrics = (metrics) => client.post(`/metrics/`, metrics)
metricsApi.updateProblemMetrics = (problemId, metrics) => client.put(`/metrics/${problemId}`, metrics)
metricsApi.getTrendingProblems = () => client.get("/metrics/trendings")


export default metricsApi;