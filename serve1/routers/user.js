const router= require('koa-router')();
const userController = require('./../controllers/user')


// 用户信息
router.get('/user/userInfo', userController.UserInfo);

// 登录
router.post('/user/login', userController.Login);

// 注册
router.post('/user/register', userController.Register);

// 上传头像
router.post('/user/UpUserICON', userController.UpUserICON);

// 下载头像
router.get('/user/Download', userController.DownloadIcon);

module.exports = router
