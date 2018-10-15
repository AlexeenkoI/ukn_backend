var mysql = require('mysql');
//var connection = mysql.createPool({
//  host     : '46.147.193.8',
//  port : '1915',
//  user     : 'igor',
//  password : 'qwerty12345',
//  database : 'ukn',
//  dateStrings: true
//});
//var connection = mysql.createPool({
//  host     : 'localhost',
//  port : '3306',
//  user     : 'root',
//  password : '',
//  database : 'ukn_office',
//  dateStrings: true
//});
//module.exports = connection;
var connection = mysql.createPool({
  host     : '31.31.196.172',
  port : '3306',
  user     : 'u0579301_igor',
  password : 'qwerty12345',
  database : 'u0579301_ukn',
  dateStrings: true
});
module.exports = connection;