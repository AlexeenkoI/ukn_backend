var mysql = require('mysql');
/*
var connection = mysql.createPool({
  host     : '31.31.196.172',
  port : '3306',
  user     : 'u0579301_igor',
  password : 'qwerty12345',
  database : 'u0579301_ukn',
  dateStrings: true
});
*/
var connection = mysql.createPool({
  host     : '213.183.51.110',
  port : '3306',
  user     : 'igor',
  password : 'deDnmr1x',
  database : 'ukn',
  dateStrings: true
});
module.exports = connection;