var Authorizer = require('../../models/helpers/authorizer');
var User = require('../../models/users');
var Test = require('../../models/test');

module.exports.Checktoken = async function Checktoken(reg, res, next){    
    console.log('start authorizer')  ;   
    if(!reg.cookies.auth_id){
        res.json({success: false,  errMsg : 'Неверный формат данных'})
    }
    const userId = reg.body.userId ? reg.body.userId : 0;
    const auth = new Authorizer(); 
    try{    
        const result = await auth.checkToken(userId, reg.cookies.auth_id);
        if(result[0].nums != 0){next();}
        else{res.json({success:false, msg:'Ошибка валидации. Пожалуйста перелогинтесь'})}
    }catch(e){        
        console.log(e);
        res.json({success:false, msg:e})
    }
}

module.exports.Login = async function(req, res, next) {
    const params = {where : req.body.data};
    const user = new User();
    const data = await user.getUser(params);    
    //const roles = await user.getUsersRoles();    
    
    if(data.length <= 0){
      console.log('data is null');
      res.json({success : false, msg : 'Неверные данные или пользователь не найден.'})
    }
    try{                
        const auth = new Authorizer()        
        const rows = await auth.insertOrUpdateToken(data[0].id);                       
        res.cookie('auth_id', rows.token);
        res.json({success: true, data : data, /*userRoles : roles*/});
    }catch(e){
        console.log(e);
        res.json({success : false,msg : 'Ошибка в исполнении'})
    }    
}

module.exports.LogOut = async function(req,res,next){
    if(!req.cookies.auth_id){
        res.json({success : false,msg : 'Неверные данные.'})      
    }else{
        res.clearCookie('auth_id');
        res.json({success:true,msg : 'Выхожу из приложения'})
    }
}

module.exports.Test = async function(req,res,next){
    test = new Test();
    try{
        const t = await test.Get();
        res.json({success : true,msg : t})      
    }catch(e){
        res.json({success : false, msg : e});
    }
}

 