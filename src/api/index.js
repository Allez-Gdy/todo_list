import axios from 'axios'

const service = axios.create({
    // baseURL: "http://82.157.165.58:3300/",
    baseURL: "http://localhost:3300/",
})

// 异常处理
const err = (error)=> {
    if(error.response) {
        if(error.response.status !== 200 && error.response.status !== 0) {
            return error.response
        }
    }
    return Promise.reject(error)
}

// 请求拦截
service.interceptors.request.use(config=> {
    let token = localStorage.getItem('todo-token');
    if(token) {
        config.headers.authorization = token;
    }else {
        let url = config.url.split("/");
        let apiUrl = url[url.length - 2];
        let pageUrl = url[url.length - 1];
        if (
            apiUrl === "email" ||
            apiUrl === "file" ||
            pageUrl === "login" ||
            pageUrl === "register"
        ) {
            console.log("允许不携带token通过路由");
        } else {
            uni.navigateTo({
                url: '/pages/login/login'
            })
        }
    }
    return config;
},err=> {
    return Promise.reject(err);
})

// 响应拦截
// service.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (err) => {
//     return Promise.reject(error.response.data);
//   }
// );

export default service;