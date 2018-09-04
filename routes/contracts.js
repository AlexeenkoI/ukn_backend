var express = require('express');
var router = express.Router();
var Contracts = require('../models/contracts');
var Authorizer = require('../models/helpers/authorizer');

router.post('/getcontracts',function(req,res,next){
    var where = req.body.data;
    var limit = req.body.data.limit;
    var offset = req.body.data.offset;
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
            const tbl = new Contracts();
            tbl.getContracts(where,limit,offset)
            .then( rows => {
                res.json({
                    success: true,
                    data : rows
                })
            })
            .catch(err => {
                res.json({
                    success : false,
                    errMsg : err
                })
            })
        }
    })
    .catch(error => {
        res.json({
            success : false,
            errMsg : error
        })
    })

    
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

module.exports = router;