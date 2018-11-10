var Customers = require('../../models/customers');

module.exports.GetCustomers = async function(reg, res, next){       
    const cus = new Customers();
    body = {where : {...reg.body.data}}; 
    try{                        ;
        const result = await cus.getCustomers(body);        
        const count = await cus.getCount(body);  
        console.log(count);

        res.json({success : true, count:count[0].count,data : result})
    }catch(e){       
        res.json({success : false,msg : e})
    }
}

module.exports.GetCustomer = async function(reg, res, next){           
    if(!reg.params.id) res.status(500).send('Get out of here');
    body = {where : {id : reg.params.id }}; 
    const customer = new Customers();               
    try{
        const data = await customer.getCustomers(body);  
          
        res.json({success:true,  data:data})    
    }catch(e){
        res.json({success : false, msg : e})
    }
}

module.exports.UpdateCustomer = async function(reg,res,next){    
    if(!reg.params.id) res.status(500).send('Get out of here');
    const customer = new Customers();
    console.log('update customers');
    console.log(reg.body);
    try{
        if(reg.params.id != 0){
            const data = await customer.update(reg.params.id,reg.body.data);
            res.json({success:true, msg : "Данные обновлены", data :  data});       
        }else{
            res.json({success : false,msg : "user id error"});    
        }
    }catch(e){
        res.json({success:false, msg : e})
    }
}

module.exports.DeleteCustomer = async function(reg, res, next){   
    if(!reg.params.id) res.status(500).send('Get out of here');
    const customer = new Customers();
    try{
        console.log(reg.params.id);
        const data = await customer.delete(reg.params.id);
        res.json({success:true, msg : "Клиент удален",data : data})
    }catch(e){
        res.json({success:false, msg : e})
    }
}

module.exports.CreateCustomer = async function(reg, res, next){
    const customer = new Customers();
    try{
        const data = await customer.insert(reg.body.data);
        res.json({success:true, msg : "Клиент создан", data : data})
    }catch(e){
        res.json({success : false, msg : e})
    }
}