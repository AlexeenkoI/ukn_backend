var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* POST users listing. */
router.post('/', function(req, res, next) {
  //console.log(req.body.data);
  const user = new User();
  user.getUser(req.body.data)
  .then(rows => {
      res.json({
        success : true,
        data : rows
      })
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
