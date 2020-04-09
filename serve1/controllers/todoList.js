const {List, Add, Mdy, Del} = require('../service/todoList');
const Result = require("../utils/Result");

const todoController = {

  // 列表
  async TodoList(ctx, next) {
    let done =Number(ctx.query.done) || 0;
    let res = await List(done);
    new Result(res,'查询成功！').success(ctx);
  },

  // 添加
  async TodoAdd(ctx, next){
    const title = ctx.request.body.title || '';
    let rs = await Add(title);
    if (rs.affectedRows > 0) {
      new Result('添加成功').success(ctx);
    } else {
      new Result('添加失败').fail(ctx);
    }
  },

  // 删除
  async TodoDel(ctx, next) {
    const id = Number(ctx.request.body.id) || '';
    let rs = await Del(id);
    if (rs.affectedRows > 0) {
      new Result('删除成功').success(ctx);
    } else {
      new Result('删除失败').fail(ctx);
    }
    
  },

  // 修改
  async MdyTodos(ctx, next){
    const id = ctx.request.body.id || '';
    let rs = await Mdy(id);
    if (rs.affectedRows > 0) {
      new Result('标记成功！').success(ctx);
    } else {
      new Result('标记失败！').fail(ctx);
    }
  }
}

module.exports = todoController;

