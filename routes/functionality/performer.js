var Performers = require('../../models/performers');

module.exports.GetPerformers = async function(reg, res, next){       
    console.log("performers get performers");
    const per = new Performers();
    body = {where : {...reg.body.data}};     
    try{                       
        const result = await per.GetPerformers(body);        
        console.log(result);
        res.json({success : true, data : result});
    }catch(e){       
        res.json({success : false,msg : e})
    }
}

module.exports.GetPerformer = async function(reg, res, next){           
    if(!reg.params.id) res.status(500).send('Get out of here');
    body = {where : {id : reg.params.id }}; 
    const per = new Performers();             
    try{
        const data = await customer.GetPerformers(body);  
          
        res.json({success:true,  data:data})    
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.UpdatePerformer = async function(reg,res,next){    
    if(!reg.params.id) res.status(500).send('Get out of here');
    const per = new Performers();     
    console.log('update Performer');
    console.log(reg.body);
    try{
        if(reg.params.id != 0){
            const data = await per.update(reg.params.id,reg.body.data);
            res.json({success:true, msg : "Данные обновлены", data :  data});       
        }else{
            res.json({success : false,msg : "performer error"});    
        }
    }catch(e){
        res.json({success:false, msg : e})
    }
}

module.exports.DeletePerformer = async function(reg, res, next){   
    if(!reg.params.id) res.status(500).send('Get out of here');
    const per = new Performers();    
    try{
        console.log(reg.params.id);
        const data = await per.delete(reg.params.id);
        res.json({success:true, msg : "исполнитель удален",data : data})
    }catch(e){
        res.json({success:false, msg : e})
    }
}

module.exports.CreatePerformer = async function(reg, res, next){
    console.log(reg.body.data);
    const per = new Performers();  
    try{
        const data = await per.insert(reg.body.data);
        res.json({success:true, msg : "исполнитель добавлен", data : data})
    }catch(e){
        res.json({success : false, msg : e})
    }
}