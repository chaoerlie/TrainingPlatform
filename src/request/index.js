
import axios from 'axios'
import {apiGetUserInfo} from "../apis/user";
import router from "../router";

// 创建一个 axios 实例

let token=''

const service = axios.create({
    baseURL: '', // 所有的请求地址前缀部分
    timeout: 60000, // 请求超时时间毫秒
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        // 'Content-Type': 'application/json',
        'token': token,
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// // 添加请求拦截器
// service.interceptors.request.use(
//     function (config) {
//         // 在发送请求之前做些什么
//         //config.headers.token = window.localStorage.getItem(‘token’)
//
//         return config
//     },
//     function (error) {
//         // 对请求错误做些什么
//         console.log(error)
//         return Promise.reject(error)
//     }
// )


axios.interceptors.request.use(function (config) {
    // if (user) {
    //     token = user.token;
    // }
    if(localStorage.getItem('token'))
        config.headers.token = localStorage.getItem('token')
    // config.headers.token = token;
    //console.dir(config);
    return config;
}, function (error) {
    // Do something with request error
    console.info("error: ");
    console.info(error);
    return Promise.reject(error);
});


// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        console.log(response)


        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        const code = dataAxios.reset
        return dataAxios
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        console.log(23423)
        console.log(error.response)
        if(error.response.status==403)
        {
            console.log(234)
            apiGetUserInfo({
                username:'kkkzoz',
                password:'kkkzoz'
            }).then((res) => {
                console.log(res)
                localStorage.setItem('token',res.data.token)
                console.log(localStorage.getItem('token'))

            })

        }
        return Promise.reject(error)
    }
)


export default service