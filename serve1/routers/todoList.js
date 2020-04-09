const router= require('koa-router')();
const todoController = require('./../controllers/todoList')

// 添加
router.post('/Todos/Add', todoController.TodoAdd);

// 删除
router.post('/Todos/Del', todoController.TodoDel);

// 修改
router.post('/Todos/MdyTodos', todoController.MdyTodos);

// 列表
router.get('/Todos/GetList', todoController.TodoList);

module.exports = router;