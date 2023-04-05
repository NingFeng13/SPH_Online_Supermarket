import axios from "axios"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000,
})

requests.interceptors.request.use((config) => {
    //config 配置对象，有一个属性很重要，请求头header
    nprogress.start();
    return config;
})

requests.interceptors.response.use((res) => {
    nprogress.done();
    return (res.data);
}, (err) => {
    return Promise.reject(new Error('error'))
})


export default requests;