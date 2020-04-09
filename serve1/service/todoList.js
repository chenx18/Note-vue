const { query } = require('../utils/mysql');

async function List(val) {
  return query( 
    `SELECT * From todos where Done='${val}'`
  )
}

async function Add(title) {
  return query(
    `insert into todos (Title) values("${title}")`
  )
}

async function Mdy(id) {
  return query(
    `update todos set Done="${1}" where( ID=${id} )`
  )
}

async function Del(id) {
  return query(
    `delete from todos where(ID=${id})`
  )
}

module.exports = {
  List,
  Add,
  Mdy,
  Del
}