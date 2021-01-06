import axios from 'axios';
import { set } from 'vue/types/umd';
const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/353b3ff6ec4bb5e23761589b516b7615/api',
    timeout :6000
  });

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

const post = (url,data) =>{
    return instance.post(url,data);
}

const get = (url,data) =>{
  return instance.get(url,{params:data});
}
export {
    post,
    get
}

