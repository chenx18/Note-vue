'use strict'
import axios from 'axios'

// 请求方式的配置
export default {
  //  post
  post(url, data) { 
    return axios({
      method: 'post',
      url,
      data: data,
    })
  },
  // get
  get(url, params) { 
    return axios({
      method: 'get',
      url,
    })
  },
}