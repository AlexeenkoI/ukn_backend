var mysql = require('mysql');
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ukn_office'
});
module.exports = connection;