var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Authorizer = require('../models/helpers/authorizer');

/* POST users listing. */
router.post('/', function(req, res, next) {
  //console.log(req.body.data);
  const user = new User();
  user.getUser(req.body.data)
  .then(rows => {
      if(rows.length > 0){
      var auth = new Authorizer();
      auth.insertOrUpdateToken(rows[0].id).then((result) => {
        res.cookie('auth_id',result.token);
        res.json({
          success : true,
          data : rows
        })
      })
      .catch(err => {
        console.log('token gen failed');
        console.log(err);
      })
    }else{
      res.json({
        success : false,
        errMsg : 'Неверные данные или пользователь не найден.'
      })
    }
  })
  .catch(err => {
    console.log(err);
      res.json({
        success : false,
        errMsg : 'Ошибка в исполнении'
      })
  })

});

/* POST-SETUP */

module.exports = router;
