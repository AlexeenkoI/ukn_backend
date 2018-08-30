var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ukn_office'
});
connection.connect();




/* POST users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  let query = 'SELECT * FROM ukn_employe WHERE login = ' + mysql.escape(req.body.login) + ' AND password = ' + mysql.escape(req.body.password);
  console.log(query);
  connection.query(query, function(err, rows, fields) {
  if (err) throw err;
  console.log('succsess connect: ', rows);
  //console.log(fields);
  if(rows.length > 0){
    var user = rows[0].name;
    var password= rows[0].password;
    res.json({
      success : 'true',
      //status: rows[0].status,
      status : 'ok',
      name : user,
      token : password
    });
  }else{
    res.json({
      success:false,
      errMsg:'Неверный логин или пароль'
    })
  }

  });

//connection.end();

  //res.send('respond with a resource');

  //res.json([{
  //	id: 1,
  //	username: "Alex1"
  //}, {
  //	id: 2,
  //	username: "Lena"
  //}]);
});

/* POST-SETUP */

module.exports = router;
