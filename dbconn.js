var mysql = require('mysql');
var connection = mysql.createPool({
  host     : '',
  port : '',
  user     : '',
  password : '',
  database : ''
});
module.exports = connection;