var UserRole = require('../../models/user_roles');

module.exports.GetUserRoles = async function(req,res,next){   
    const userrole = new UserRole();
    try{
        const data = await userrole.getUserRoles(req.body);
        res.json({success:true, data:data});
    }catch(e){
        res.json({success : false,msg : e})
    }            
}

module.exports.GetUserRole = async function(reg, res, next){       
    console.log(reg.params.id);
    if(!reg.params.id) res.status(500).send('Get out of here');
    body = {where : {id : reg.params.id }}; 
    const userrole = new UserRole(); 
    try{        
        const data = await userrole.getUserRoles(body)  
        res.json({success:true, data:data})    
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.UpdateUserRole = async function(reg, res, next){
    if(!reg.params.id) res.status(500).send('Get out of here');
    const userrole = new UserRole(); 
    try{
        if(reg.params.id > 0){         
            const data = await userrole.update(reg.params.id,reg.body.data);            
            res.json({success : true,msg : 'Данные обновлены.', data : data});
        }
    }catch(e){
        console.log(e);
        res.json({success : false,msg : e});
    }
}

module.exports.CreateUserRole = async function(reg, res, next){
    console.log("Create status types");
    const userrole = new UserRole();  
    try{        
        const data = await userrole.insert(reg.body.data);    
        res.json({success:true, msg : "user role создан", data : data})
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.DeleteUserRole = async function(reg, res, next){   
    if(!reg.params.id) res.status(500).send('Get out of here');
    const userrole = new UserRole(); 
    try{                
        const data = await userrole.delete(reg.params.id);
        res.json({success:true, msg : "user role удален",data : data})
    }catch(e){
        res.json({success:false, msg : e})
    }
}