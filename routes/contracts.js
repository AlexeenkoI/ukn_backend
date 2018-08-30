var express = require('express');
var router = express.Router();
var Contracts = require('../models/contracts');

router.post('/getcontracts',function(req,res,next){
    console.log(req.body);

    var where = req.body.data;
    var limit = req.body.limit;
    var offset = req.body.offset;
    console.log(where);
    console.log(limit);
    console.log(offset);
    var val = Contracts.getContracts(where,limit,offset);
    console.log(val);
    res.json({
        status:'ok',
        vaue : 1
    })
    
});

module.exports = router;