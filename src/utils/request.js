import axios from "axios";
import history from "../router/index"
const baseURL = "/api"
const instance = axios.create({ baseURL })
import useToken from "../store/index";
import { message } from "antd"
// function getToken() {
//     const { token } = useToken();
//     return toekn
// }
instance.interceptors.request.use(
    config => {//请求前
        // 


        const token = useToken.getState().token
        console.log(token);
        if (token) {
            // 由token 的话就添加请求头
            config.headers.Authorization = token;
        }
        return config;
    },
    err => { // 失败时
        Promise.reject(err)
    }
)

//添加响应拦截器
instance.interceptors.response.use(

    result => {
        if (result.data.code === 0) {
            return result.data
        };
        console.log(result);
        // ElMessage.error(result.data.message ? result.data.message : "服务异常")
        return Promise.reject(result.data)
    },
    err => {
        debugger
        if (err.response.status === 401) { // 表示未登录

            // history.push('/login');
            window.location.href = "/login"
        } else {
            message.error(
                'The Server occured Error'
            );
        }

        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;