var env = require('../env.json');
var mysql = require('mysql');
var util = require('util');

var pool = mysql.createPool({
	connectionLimit: 5,
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }
  if (connection) {
    console.log("database connected");
    connection.release()
  }
  return
});

pool.query = util.promisify(pool.query);
module.exports = pool;
