var Contracts = require('../../models/contracts');
const Sequelize = require('sequelize');
const sequelize = require('../../dbconn');
const model = require('../../models/init');

module.exports.GetContracts = async function(req,res,next){   
    
    /**
     * Метододы модели - статические, создавать экземпляр -
     * НЕ НАДО !!!
     */
    //const contract = new Contracts(sequelize, Sequelize);
    //contract.init(sequelize, Sequelize);
    //let contract = Contracts.init(sequelize, Sequelize);
    //contract : Contracts.init(sequelize, Sequelize);
    //console.log(req.body.data);
    try{
        console.log("in try");
        console.log(req.body.data);
        const data = await model.Contract.GetContracts(model, req.body.data);
        //console.log(data);   
        //const data = await contract.getContracts(req.body.data);
        //const count = await contract.getCount(req.body.data);        
        //res.json({success:true,count : count[0].count, data:data});
        res.json({success:true,data:data});
    }catch(e){
        console.log('in catch');
        console.log(e);
        res.json({success : false,msg : e})
    }            
}

module.exports.GetContract = async function(reg, res, next){       
    console.log(reg.params.id);
    if(!reg.params.id) res.status(500).send('Get out of here');
    //body = {where : {id : reg.params.id }}; 
    const contract = new Contracts();    
    try{        
        const data = await contract.getContracts(reg.params)  ;        
        res.json({success:true, data:data})    
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.UpdateContracts = async function(reg, res, next){
    if(!reg.params.id) res.status(500).send('Get out of here');
    const contract = new Contracts();
    try{
        if(reg.params.id > 0){         
            const data = await contract.update(reg.params.id,reg.body.data);            
            res.json({success : true,msg : 'Данные обновлены.', data : data});
        }
    }catch(e){
        console.log(e);
        res.json({success : false,msg : e});
    }
}

module.exports.CreateContract = async function(reg, res, next){
    const contract = new Contracts();
    try{        
        const data = await contract.insert(reg.body.data);    
        res.json({success:true, msg : "Контракт создан", data : data})
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.DeleteContract = async function(reg, res, next){   
    if(!reg.params.id) res.status(500).send('Get out of here');
    const contract = new Contracts();
    try{        
        const data = await contract.delete(reg.params.id);
        res.json({success:true, msg : "Контракт удален",data : data})
    }catch(e){
        res.json({success:false, msg : e})
    }
}
