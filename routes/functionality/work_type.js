var WorkType = require('../../models/work_types');

module.exports.GetWorkTypes = async function(req,res,next){   
    const worktype = new WorkType();
    try{
        const data = await worktype.getWorkTypes(req.body);
        res.json({success:true, data:data});
    }catch(e){
        res.json({success : false,msg : e})
    }            
}

module.exports.GetWorkType = async function(reg, res, next){       
    console.log(reg.params.id);
    if(!reg.params.id) res.status(500).send('Get out of here');
    body = {where : {id : reg.params.id }}; 
    const worktype = new WorkType();
    try{        
        const data = await worktype.getWorkTypes(body)  
        res.json({success:true, data:data})    
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.UpdateWorkType = async function(reg, res, next){
    if(!reg.params.id) res.status(500).send('Get out of here');
    const worktype = new WorkType();
    try{
        if(reg.params.id > 0){         
            const data = await worktype.update(reg.params.id,reg.body.data);            
            res.json({success : true,msg : 'Данные обновлены.', data : data});
        }
    }catch(e){
        console.log(e);
        res.json({success : false,msg : e});
    }
}

module.exports.CreateWorkType = async function(reg, res, next){
    console.log("Create status types");
    const worktype = new WorkType();
    try{        
        const data = await worktype.insert(reg.body.data);    
        res.json({success:true, msg : "work type создан", data : data})
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.DeleteWorkType = async function(reg, res, next){   
    if(!reg.params.id) res.status(500).send('Get out of here');
    const worktype = new WorkType();
    try{                
        const data = await worktype.delete(reg.params.id);
        res.json({success:true, msg : "work type удален",data : data})
    }catch(e){
        res.json({success:false, msg : e})
    }
}