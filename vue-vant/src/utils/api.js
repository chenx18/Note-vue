/** 
 * api接口统一管理
 */

import http from './http'

class Todos {
  constructor() {};
  // 登录
  Loging = params => {
    return http.post('/api/user/login', params);
  }
  // 注册
  Registering = params => {
    return http.post('/api/user/register', params);
  }
  // 
  GetTodoList = params => {
    return http.get('/api/Todos/GetList', params);
  }

  AddTodos = params => {
    return http.post('/api/Todos/Add', params);
  }
  
  DelTodos = params => {
    return http.post('/api/Todos/Del', params)
  }

  MdyTodos = params => {
    return http.post('/api/Todos/MdyTodos', params)
  }
  GetUserInfo = params => {
    return http.get('/api/user/userInfo', params);
  }
  UpUserICON = (data) => {
    return http.postFile('/api/user/UpUserICON', data)
  }
  DownloadIcon = params => {
    return http.get('/api/user/Download',params);
  }
}

export default new Todos;
