var User = require('../../models/users');

module.exports.GetUsers = async function(req,res,next){
    const user = new User();
    body = {where : { ...req.body.data }}
    try{       
        //const roles = await user.getUsersRoles();
        const users = await user.getUser(body);  
        const count = await user.getCount(body);
        res.json({success : true,count:count[0].count, users : users, /*userRoles : roles*/});
    }catch(e){    
        res.json({ success : false,msg : e});
    }
}

module.exports.GetUser = async function(req, res, next){
    if(!req.params.id) res.status(500).send('Get out of here');    
    body = {where : {id : req.params.id }}; 

    const user = new User();  
    try{
        data = await user.getUser(body);        
        //roles = await user.getUsersRoles();
        res.json({success : true,data : data/*,userRoles : roles*/});
    }catch(e){
        console.log(e);   
        res.json({ success : false,msg : e}) ;
    }    
}

module.exports.UpdateUser = async function(reg, res, next){        
    if(!reg.params.id) res.status(500).send('Get out of here');
    const user = new User();        
    try{
        if(reg.params.id != 0 ){        
            const data =  await user.update(reg.params.id,reg.body.data);
            res.json({success : true,msg : 'Данные обновлены', data : data});
        }     
        
    }catch(e){
        console.log(e);
        res.json({success : false,msg : e});
    }  
}

  module.exports.CreateUser = async function(req, res, next){    
    //if(!req.params.id) res.status(500).send('Get out of here');
    const user = new User();
    try{
        const data = await user.insert(req.body.data);          
        res.json({success:true, msg : "Пользователь создан"});
    }catch(e){
        res.json({success : false, msg : e, data : data});
    }
}

module.exports.DeleteUser = async function(req, res){
    if(!req.params.id)res.status(500).send('GET OU OF HERE');
    const user = new User();
    try{
        user.delete(req.params.id)
        res.json({success : true,msg : 'Пользователь удален'});
    }catch(e){    
        res.json({success : false,msg : err});
    }
}
  
