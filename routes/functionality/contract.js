var Contracts = require('../../models/contracts');

module.exports.GetContracts = async function(req,res,next){   
    const contract = new Contracts();
    body = {where : { ...req.body.data }}
    console.log(body)
    try{
        const data = await contract.getContracts(body);
        const count = await contract.getCount(body);        
        res.json({success:true,count : count[0].count, data:data});
    }catch(e){
        res.json({success : false,msg : e})
    }            
}

module.exports.GetContract = async function(reg, res, next){       
    console.log(reg.params.id);
    if(!reg.params.id) res.status(500).send('Get out of here');
    body = {where : {id : reg.params.id }}; 
    const contract = new Contracts();    
    try{        
        const data = await contract.getContracts(body)  ;        
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
