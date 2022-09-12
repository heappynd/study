import mysql2 from 'mysql2'

/**
 *
 * @returns { mysql2.PoolOptions }
 */
function getDBConfig() {
  return {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'mydb',
    connectionLimit: 1,
  }
}

const config = getDBConfig()
const promisePool = mysql2.createPool(config).promise()

const orderBy = 'score'
const limit = 2
// const data = await promisePool.query(
//   `select * from students order by "${orderBy}" desc limit 1 offset 0`
// )
const data = await promisePool.query(
  `select * from students order by ? asc limit ? offset 0`,
  [orderBy, limit]
)
console.log(data[0])

function insertInto() {
  promisePool.query(
    `insert into students(name,score,gender,class_id) values (?,?,?,?)`,
    ['andy', 89, 0, 1]
  )
}

function update() {
  promisePool.query(
    `update students set class_id= ?, score= ? where id= ?`,
    [1, 100, 1]
  )
}

// update()

function del() {
  promisePool.query(`delete from students where id= ?`, [1])
}
// del()
