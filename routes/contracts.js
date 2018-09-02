var express = require('express');
var router = express.Router();
var Contracts = require('../models/contracts');

router.post('/getcontracts',function(req,res,next){
    var where = req.body.data;
    var limit = req.body.limit;
    var offset = req.body.offset;
    const tbl = new Contracts();
    tbl.getContracts(where,limit,offset)
    .then( rows => {
        console.log('in resolve promise');
        console.log(rows);
        res.json({
            status:'ok',
            value : 2
        })
    })
    .catch(err => {
        console.log('in reject promise')
        console.log(err);
    })

    
});

module.exports = router;