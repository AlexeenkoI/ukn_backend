var express = require('express');
var router = express.Router();
var Contracts = require('../models/contracts');
var Authorizer = require('../models/helpers/authorizer');
var moment = require('moment');

router.use(function(req,res,next){
    console.log('in contracts middleware');
    const token = req.cookies.auth_id ? req.cookies.auth_id : '';
    if(token == ''){
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


router.post('/getcontracts',function(req,res,next){
    var where = req.body.data ? req.body.data : {};
    var limit = req.body.data ? req.body.data.limit : '';
    var offset = req.body.data ? req.body.data.offset : '';

    const token = req.cookies.auth_id ? req.cookies.auth_id : '';
    //const userId = req.body.userId ? req.body.userId : 0;

    // if(token == ''){
    //     res.json({
    //         success:false,
    //         errMsg : 'доступ Запрещен.'
    //     })
    //     return;
    // }
    // const auth = new Authorizer();
    // auth.checkToken(userId,token)
    // .then(result =>{
    //     console.log(result);
    //     if(result.nums != 0){
            const tbl = new Contracts();
           
            tbl.getContracts(where,limit,offset)
            .then( rows => {
                rows.forEach(row => {
                   var dateStarted = new Date(row.date_started*1000);
                   var dateEnd = new Date(row.date_deadline*1000);
                   var dS = moment(dateStarted).format("DD/MM/YYYY");
                   var dE = moment(dateEnd).format("DD/MM/YYYY");
                   row.date_started = dS;
                   row.date_deadline = dE;
                });
                res.json({
                    success: true,
                    data : rows
                })
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success : false,
                    errMsg : err
                })
            })
    //     }
    // })
    // .catch(error => {
    //     res.json({
    //         success : false,
    //         errMsg : error
    //     })
    // })

    
});

router.post('/updatecontracts',function(req,res,next){
    const token = req.cookies.auth_id ? req.cookies.auth_id : '';
    const userId = req.body.userId ? req.body.userId : 0;
    if(token == ''){
        res.json({
            success:false,
            errMsg : 'доступ Запрещен.'
        })
        return;
    }

    const auth = new Authorizer();
    auth.checkToken(userId,token)
    .then(result =>{
        if(result.nums !=0){
        const table = new Contracts();
        table.update(userId,req.body.data)
        .then(() =>{
            res.json({
                success : true,
                msg : 'Успешно Обновлено.'
            })
        })
        .catch(error =>{
            res.json({
                success : false,
                errMsg : error
            })
        })
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

router.post("/deletecontract",function(req,res,next){
    const data = req.body.data;
    const token = req.cookies.auth_id ? req.cookies.auth_id : '';
    const userId = req.body.userId ? req.body.userId : 0;
    if(token == '' || data.hasOwnProperty('deleteId')==false){
        res.json({
            success:false,
            errMsg : 'доступ Запрещен.'
        })
        return;
    }
    const auth = new Authorizer();
    auth.checkToken(userId,token)
    .then(result =>{
        if(result.nums != 0){
            const table = new Contracts();
            table.delete(data.deleteId)
            .then(()=>{
                res.json({
                    success : true,
                    msg : 'Успешно удалено'
                })
            })
            .catch(err =>{
                res.json({
                    success : false,
                    errMsg : err
                })
            })
        }else{
            res.json({
                success : false,
                errMsg : 'Ошибка валидации. Пожалуйста перелогиньтесь'
            })
        }
    })

})

router.post("/addcontract",function(req,res,next){
    const token = req.cookies.auth_id ? req.cookies.auth_id : '';
    const userId = req.body.userId ? req.body.userId : 0;
    if(token == ''){
        res.json({
            success:false,
            errMsg : 'доступ Запрещен.'
        })
        return;
    }
    const auth = new Authorizer();
    auth.checkToken(userId,token)
    .then(result =>{
        if(result.nums != 0){
            const table = new Contracts();
            table.insert(req.body.data)
            .then(()=>{
                res.json({
                    success : true,
                    msg : 'Успешно добавлено'
                })
            })
            .catch(error =>{
                res.json({
                    success : false,
                    errMsg : error
                })
            })
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

router.post('/getfilters',function(req,res,next){
    console.log('here');
    const table = new Contracts();
    table.getFilterData()
    .then(rows => {
        console.log('filters');
        console.log(rows);
        res.json({
            success : true,
            filterData : rows
        })
    })
    .catch(error => {
        res.json({
            success : false,
            errMsg : error
        })
    })
})

router.post('/getcontract/:id', async function(req,res){
    if(!req.params.id) res.status(500).send('No answer for you!');
    const data = req.body;
    console.log(data);
    console.log(req.params);
    if(!data.userId){
        res.json({
            success : false,
            msg : 'Wrong Data'
        })
        return
    }
    const table = new Contracts();
    let contract = {};
    try{
        contract = await table.getContract(req.params);
        res.json({
            success : true,
            data : contract
        })
    }catch(err){
        res.json({
            success : false,
            msg : 'Ошибка на сервере во время получения данных.'
        })
    }

})

router.post('/updatecontract/:id', async function(req, res){
    if(!req.params.id) res.status(500).send('No answer for you!');

})

module.exports = router;