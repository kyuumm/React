//axios
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";
//根域名
//超时时间
//请求拦截器
//相应拦截器
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
//在请求发送之前 做拦裁 插入一些自定义的配置 [参数的处理]
request.interceptors.request.use((config) => {
  //操作config注入token
  //获取token
  const token = getToken()
  //按后端格式做token拼接
  if (token) {
    config.headers.Authorization = `Bearer ${token}`


  }
  return config
})

// 添加响应拦截器
//在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  //监控401
  if (error.response.status === 401) {
    removeToken();
    router.navigate('/login');
    //有bug
    window.location.reload();
  }
  return Promise.reject(error)
})

export { request }