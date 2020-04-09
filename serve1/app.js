const path = require('path')          // 
const Koa = require('koa')           // koa框架
const koaBody = require('koa-body')   // 处理请求参数
const koajwt = require('koa-jwt')     // 登录鉴权
const koaCors = require('koa2-cors')  // 跨域
const {TOKEN_KEY} = require('./utils/constant');
const {verifyToken} = require('./utils/token')
const router = require('./routers/index') // 路由
const app = new Koa()


// 文件上传中间件 koa-body
app.use(koaBody({
  multipart:true, // 支持文件上传
  formidable:{
    uploadDir:path.join(__dirname,'/public'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    onFileBegin:(name,file) => { // 文件上传前的设置
      const fileFormat = file.name.split('.');
      file.name = `${Date.now()}.${fileFormat[fileFormat.length-1]}`;
      file.path = `public/${file.name}`;
    },
  }
}));

// 跨域 koa-cors
app.use(koaCors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}))

// 中间件对token进行验证
app.use(verifyToken)

// 进行 jwt 认证
app.use(koajwt({ secret: TOKEN_KEY }).unless({
  path:[
    /\//,
    /\/api\/user\/login/,
    /\/api\/user\/register/,
    /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}));



// 路由配置
app.use(router.routes())
app.use(router.allowedMethods())  




app.listen(3000)