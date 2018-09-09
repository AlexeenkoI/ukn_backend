var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Authorizer = require('../models/helpers/authorizer');

router.use('/getusers',function(req,res,next){
  const token = req.cookies.auth_id ? req.cookies.auth_id : '';
  if(!req.body.data || token == ''){
      res.json({
        success: false,
        errMsg : 'Неверный формат данных'
      })
      return;
  }
  
  const userId = req.body.userId ? req.body.userId : 0;
  const auth = new Authorizer();
  auth.checkToken(userId,token)
  .then(result => {
      if(result.nums != 0){
          next();
      }else{
          res.json({
              success : false,
              errMsg : 'Ошибка валидации. Пожалуйста перелогиньтесь'
          })
      }
  })
  .catch(error =>{
      res.json({
          success : false,
          errMsg : error
      })
  })
})

/* POST users listing. */
router.post('/login', function(req, res, next) {
  console.log(req.body);
  const user = new User();
  user.getUser(req.body.data)
  .then(rows => {
      if(rows.length > 0){
      var auth = new Authorizer();
      auth.insertOrUpdateToken(rows[0].id)
      .then((result) => {
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

router.post('/logout',function(req,res,next){
  const token = req.cookies.auth_id ? req.cookies.auth_id : null;
  if(token == null){
    res.json({
      success : false,
      errMsg : 'Неверные данные.'
    })
    return;
  }
  res.clearCookie('auth_id');
  res.json({
    success:true,
    msg : 'Выхожу из приложения'
  })
})

/* POST-SETUP */

router.post('/getusers',function(req,res,next){
  const user = new User();
  user.getUsers()
  .then(rows => {
    res.json({
      success : true,
      users : rows
    })
  })
  .catch(err => {
    res.json({
      success : false,
      errMsg : error
  })
  })
})

module.exports = router;
