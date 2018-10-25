var router = require('express').Router();
var Authorizer = require('../models/helpers/authorizer');
var Customers = require('../models/customers')

router.use(async function(reg, res, next){
    console.log('start use function')
    if(!reg.cookies.auth_id){
        res.json({success: false,  errMsg : 'Неверный формат данных'})
    }

    const userId = req.body.userId ? req.body.userId : 0;

    const auth = new Authorizer();
    try{
        const result = await auth.checkToken(userId, reg.cookies.auth_id)
        if(result.nums != 0){next();}
        else{res.json({success:false, msg:'Ошибка валидации. Пожалуйста перелогинтесь'})}
    }catch(e){        
        console.log(e);
        res.json({success:false, msg:e})
    }
})

router.post('/getcustomers', async function(reg, res, next){
    console.log('start getcustomers')
    //var where = req.body.data ? req.body.data : {};
    //var limit = req.body.data ? req.body.data.limit : '';

    const cus = new Customers();
    try{
        console.log('getcustomers');
        result = await cus.getCustomers();
        res.json({success : true, data : result})
    }catch(e){
        console.log(e);
        res.json({success : false,msg : e})

    }
})

router.post('')

module.exports = router;