'use strict'

import { Toast } from 'vant';
import axios from 'axios';
import router, { resetRouter } from '@/router'
//Toast()方法，引入的vant库中的toast轻提示组件，提示响应拦截出错误。

/**
 * 设置请求超时
 */
axios.defaults.timeout = 5000;

/**
 * 请求拦截器
 * 暂时未使用登陆功能
 */
axios.interceptors.request.use( 
  // 这里的 config 包含每次请求的内容
  // 判断 localStorage 中是否存在 token
  config => {
    if(localStorage.getItem('token')){
      // 存在将 token写入request header
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  }, 
  error => {  
   return Promise.error(error); 
  }, err => {
    return Promise.reject(err);
  })

 /**
  * 响应拦截器
  */
 axios.interceptors.response.use( 
  response => {  
   if (response.status === 200) {   
    return Promise.resolve(response);  
   } else {   
    return Promise.reject(response);  
   } 
  },error => { // 服务器状态码不是200的情况 
   if (error.response.status) {   
    switch (error.response.status) {    
     // 400 请求无效
     case 400:     
      Toast({message: '请求无效',duration: 1000,forbidClick: true});    
      break;
     // 401 服务器收到请求，但是拒绝提供服务 (token过期  )  
     // 登录过期对用户进行提示    
     // 清除本地token和清空vuex中token对象    
     // 跳转登录页面    
     case 401:
       console.log(33)  
      Toast({ message: '登录过期，请重新登录', duration: 1000, forbidClick: true});
      localStorage.removeItem('token');   // 清除token
      resetRouter();
      router.push("/login");   
      break; 
     // 404 请求资源不存在(请求不存在)    
     case 404:     
      Toast({      
       message: '网络请求不存在',      
       duration: 1500,      
       forbidClick: true    
      });     
     break;    
     // 其他错误，直接抛出错误提示    
     default:     
      Toast({      
       message: error.response.data.message,      
       duration: 1500,      
       forbidClick: true    
      });   
    }   
    return Promise.reject(error.response);  
   }  
  }
 );

 export default {
  /** 
    * get方法，对应get请求 
    * @param {String} url [请求的url地址] 
    * @param {Object} params [请求时携带的参数] 
    */
  get(url, params){ 
    return axios({
      method: 'get',
      url,
      params
    });
   },

  /** 
    * get方法，对应get请求 
    * @param {String} url [请求的url地址] 
    * @param {Object} params [请求时携带的参数] 
    */
  getFile(url, params){ 
    return axios({
      method: 'get',
      url,
      params,
      headers:{
        'Content-Type': 'application/json; application/octet-stream'
      },
      responseType: 'blod',
    });
   },

   /** 
    * post方法，对应post请求 
    * @param {String} url [请求的url地址] 
    * @param {Object} data [请求时携带的参数] 
    */
   post(url,data) { 
    return axios({
      method: 'post',
      url,
      data: data,
      headers: {'Content-Type': 'application/json'}
    });
   },

   /**上传文件
    * @param {String} url [请求的url地址] 
    * @param {String} data [请求时携带的文件] 
    */
   postFile(url, data) {
     return axios({
      method: 'post',
      url,
      data: data,
      anync:true,
      contentType:false,
      processData: false,
      headers: {'content-type': 'multipart/form-data'+ + new Date().getTime()}
     })
   }

 }