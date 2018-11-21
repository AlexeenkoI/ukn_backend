var StatusType = require('../../models/status_types');
const Sequelize = require('sequelize');
const sequelize = require('../../dbconn');

module.exports.GetStatusTypes = async function(req,res,next){   
    //const statustype = new StatusType();
    const statustype = new StatusType(sequelize, Sequelize);
    try{
        //const data = await statustype.GetStatusTypes(req.body);
        const data = await statustype.GetStatusType(sequelize, Sequelize);
        res.json({success:true, data:data});
    }catch(e){
        res.json({success : false,msg : e})
    }            
}

module.exports.GetStatusType = async function(reg, res, next){       
    console.log(reg.params.id);
    if(!reg.params.id) res.status(500).send('Get out of here');
    body = {where : {id : reg.params.id }}; 
    const statustype = new StatusType();   
    try{        
        const data = await statustype.getStatusTypes(body)  
        res.json({success:true, data:data})    
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.UpdateStatusType = async function(reg, res, next){
    if(!reg.params.id) res.status(500).send('Get out of here');
    const statustype = new StatusType(); 
    try{
        if(reg.params.id > 0){         
            const data = await statustype.update(reg.params.id,reg.body.data);            
            res.json({success : true,msg : 'Данные обновлены.', data : data});
        }
    }catch(e){
        console.log(e);
        res.json({success : false,msg : e});
    }
}

module.exports.CreateStatusType = async function(reg, res, next){
    console.log("Create status types");
    const statustype = new StatusType(); 
    try{        
        const data = await statustype.insert(reg.body.data);    
        res.json({success:true, msg : "Status создан", data : data})
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.DeleteStatusType = async function(reg, res, next){   
    if(!reg.params.id) res.status(500).send('Get out of here');
    const statustype = new StatusType(); 
    try{                
        const data = await statustype.delete(reg.params.id);
        res.json({success:true, msg : "Status удален",data : data})
    }catch(e){
        res.json({success:false, msg : e})
    }
}