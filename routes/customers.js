var router = require('express').Router();
var Authorizer = require('../models/helpers/authorizer');
var Customers = require('../models/customers')

router.use(async function(reg, res, next){      
    if(!reg.cookies.auth_id){
        res.json({success: false,  errMsg : 'Неверный формат данных'})
    }
    const userId = reg.body.userId ? reg.body.userId : 0;
    const auth = new Authorizer(); 
    try{    
        const result = await auth.checkToken(userId, reg.cookies.auth_id)             
        if(result[0].nums != 0){next();}
        else{res.json({success:false, msg:'Ошибка валидации. Пожалуйста перелогинтесь'})}
    }catch(e){        
        console.log(e);
        res.json({success:false, msg:e})
    }
})

router.post('/getcustomers', async function(reg, res, next){  
    var where = reg.body.data ? reg.body.data : {};   
    var limit = reg.body.data ? reg.body.data.limit : '';  
    const cus = new Customers();
    try{    
        result = await cus.getCustomers(where,limit);
        res.json({success : true, data : result})
    }catch(e){       
        res.json({success : false,msg : e})
    }
})

router.post('/getcustomer/:id', async function(reg, res, next){       
    if(!reg.params.id) res.status(500).send('Get out of here');
    const customer = new Customers();    
    try{
        const data = await customer.getCustomers(reg.params.id)  
        res.json({success:true, data:data})    
    }catch(e){
        res.json({success : false, msg : e})
    }
})

router.post('/updatecustomer/:id', async function(reg,res,next){
    if(!reg.params.id) res.status(500).send('Get out of here');
    const customer = new Customers();
    try{
        if(reg.params.id != 0){
            await customer.update(reg.params.id,reg.body.data);
            res.json({success:true, msg : "Данные обновлены"})
            /*
        }else{
            await customer.insert(reg.body.data);
            res.json({success:true, msg : "Пользователь добавлен"})
            */
        }
    }catch(e){
        res.json({success:false, msg : e})
    }
})

router.post('/deletecustomer/:id', async function(reg, res, next){
    console.log("start delete");
    if(!reg.params.id) res.status(500).send('Get out of here');
    const customer = new Customers();
    try{
        console.log(reg.params.id);
        await customer.delete(reg.params.id);
        res.json({success:true, msg : "Клиент удален"})
    }catch(e){
        res.json({success:false, msg : e})
    }
})

router.post('/createcustomer', async function(reg, res, next){
    const customer = new Customers();
    try{
        await customer.insert(reg.body.data);
        res.json({success:true, msg : "Клиент создан"})
    }catch(e){
        res.json({success : false, msg : e})
    }
})





module.exports = router;