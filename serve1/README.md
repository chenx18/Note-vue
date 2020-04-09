
## 项目依赖项
- npm install koa koa-body koa2-cors koa-jwt jsonwebtoken mysql md5 koa-router moment  --save
- npm install -g nodemon（全局） 或者 npm install -g nodemon （安装为开发依赖项）
- koa koa-router 开发 Restful API接口
- koa-router 路由拆分
- koa-cors 处理跨域
- koa-static 静态文件托管
- koa-body 接收处理请求参数
- jsonwebtoken 前后端分离 token控制登录状态
- mysql   数据库
- 全局异常处理
- async/await 异步编程
- 
---

## 项目结构详解
- 文档： http://www.youbaobao.xyz/admin-docs/guide/extra/result.html

---

### 后端项目结构

    ├── config                          // 项目配置
    │   ├── DBconfig.js                 // 数据库配置文件
    ├── controller                      // 控制器
    │   ├── user.js                     // 用户模块控制器
    │   └── ..... 
    ├── utils                           // 公共方法
    │   ├── mysql.js                    // 连接mysql
    ├── middlewares                     // 中间件
    │   ├── 
    │   └── .....
    ├── model                           // 数据表模型
    │   └──.....
    ├── routers                         // 路由
    │   ├── index.js                    // 总路由
    │   └── ..... 
    ├── service                         // service层查询数据库，根据查询结果判断，返回数据到controller
    │   └── ..... 
    ├── app.js                          // 项目入口
    └── README.md                       // 项目说明


## 项目运行

- 配置数据库

安装mysql，新建一个名称叫“**blog**”的数据库

- 安装依赖

项目根目录和根目录的app目录下分别安装
```
npm install
```
- 启动项目

项目根目录和根目录的app目录下分别启动
```
npm start
```

---
