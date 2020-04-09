const { query } = require('../utils/mysql');

async function todolist(val) {
  return query( 
    `SELECT * From todos where Done='${val}'`
  )
}

async function checkUser(account, password) {
  return query(
    `select * from users where UserAccount='${account}' and Password='${password}'`
  )
}

async function findUser(account, phone, password) {
  return query(
    `select * from users where UserAccount='${account}' or PhoneNo='${phone}'`
  )
}

async function registerUser(account, phone, password) {
  return query(
    `insert into users (UserAccount,PhoneNo,Password) values ('${account}','${phone}','${password}')`
  )
}

async function updataIcon(val){
  return query(
    `update users ser NickImg="${url}" where( UserId=${1} )`
  )
}

module.exports = {
  todolist,
  checkUser,
  findUser,
  registerUser,
  updataIcon
}