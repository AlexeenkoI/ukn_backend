var mysql = require('mysql');
var connection = mysql.createPool({
  host     : '',
  port : '',
  user     : '',
  password : '',
  database : '',
  dateStrings: true
});
module.exports = connection;