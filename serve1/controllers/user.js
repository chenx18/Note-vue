const {checkUser, findUser, registerUser, todolist, updataIcon} = require('../service/user');
const Result = require("../utils/Result");
const {createToken} = require('../utils/token');

const userController = {

  // 列表
  async GettodoList(ctx, next) {
    let done =Number(ctx.query.done) || 0;
    let data = await todolist(done);
    new Result(data,'查询成功！').success(ctx);
  },

  // 登录
  async Login(ctx,next){
    const { UserName, Password } = ctx.request.body;
    let res = await checkUser(UserName, Password);
    if(res.length===1&&res[0].UserAccount==UserName&&res[0].Password===Password) {
      const {UserAccount, UserId} = res[0];
      createToken({UserId,UserAccount}).then(e => {
        let data = {...res[0], token: e}
        new Result(data,'登录成功').success(ctx);
      });
    }else {
      new Result('登录失败').fail(ctx);
    }
  },

  // 注册
  async Register(ctx,next) {
    let { UserName, Password, PhoneNo } = ctx.request.body;
    let user = await findUser(UserName, PhoneNo, Password);
    if (user.length>0) {
      new Result('用户已存在').fail(ctx);
    } else {
      await registerUser(UserName, PhoneNo, Password).then(res => {
        if(res.affectedRows===1){
          new Result('注册成功').success(ctx);
        }else{
          new Result('注册失败').fail(ctx);
        }
      })
    }
  },

  // 用户信息
  async UserInfo(ctx, next){
    let token = ctx.header.authorization;
    if(token) {
      new Result('用户信息').success(ctx);
    }
  },
  
  // 上传头像
  async UpUserICON(ctx) {
    const file = ctx.request.files.file; //获取上传文件
    let url = "http://localhost:3000/" + file.name; // 拼接地址的为服务器文件地址
    if(file) {
      const reader = fs.createReadStream(file.path);  //1.创建可读流
      const upStream = fs.createWriteStream(`public/${file.name.toString()}`);  // 2.创建可写流
      reader.pipe(upStream);  // 3.可读流通过管道写入可写流
      const rs = await updataIcon(url);
      if(rs.affectedRows>0) {
        new Result('上传成功！').success(ctx);
      }else {
        new Result('上传失败！').fail(ctx);
      }
    }
  },
  
  // 下载头像
  async DownloadIcon(ctx) {
    const filename = ctx.query.name || '';
    if(filename) {
      const filePath = `public/${filename}`;
      ctx.attachment(filePath);
      await send(ctx, filePath)
    }
  }
  
}

module.exports = userController;

