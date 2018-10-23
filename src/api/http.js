import axios from 'axios';
import {
  Message
} from 'element-ui';
import store from '@/store';
import {
  getToken
} from '@/utils/auth';

import baseURL from './baseURL.js'

// 创建axios实例
const service = axios.create({
  /* baseURL: process.env.BASE_API, */ // api的base_url
  baseURL: baseURL,
  // 请求超时时间
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = getToken();
  }
  return config
}, error => {
  console.log(error);
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    //根据后台返回的状态码做相应的逻辑处理
  })
export default service
