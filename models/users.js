var db = require('../dbconn');
var crypto = require('crypto');
var Table = require('./table');

module.exports = class User extends Table{
    constructor(){
        const structure = {
            id : '',
            name : '',
            surename : '',
            login : '',
            password : '',
            role : '',
            is_active : ''
        }
        const tableName = 'users';
        super(tableName,structure);
    }

    update(id,data){      
        if(data.password !='' && data.hasOwnProperty('password')){
            data.password = this._hasher(data.password);
        }
        super.update(id,data);
    }

    insert(data){
        if(data.hasOwnProperty('password') && data.password !=''){
            data.password = this._hasher(data.password);
        }
        super.insert(data);
    }

    _hasher(value){
        return crypto.createHash('md5').update(value).digest('hex')
    }

    _whereString(params){
        console.log(params);
        let whereStr = '';
        if(params.hasOwnProperty('id')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.id = '${params.id}'` }
        if(params.hasOwnProperty('login')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.login like '%${params.login}%'` }
        if(params.hasOwnProperty('password')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.password = '${crypto.createHash('md5').update(params.password).digest('hex')}'` }
        if(params.hasOwnProperty('name')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.name like '%${params.name}%'` }
        if(params.hasOwnProperty('surename')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.surename like '%${params.surename}%'` }
        if(params.hasOwnProperty('role')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.role = '${params.role}'` }
        if(params.hasOwnProperty('is_active')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.is_active = '${params.is_active}'` }
        return whereStr;
    }

    _limitString(limit){
        return  limit ? ` LIMIT ${limit}` : ``;
    }  

    _offsetString(offset){
        return offset ? ` OFFSET ${offset}` : ``;
    }

    getUser(params){      

        params.where = params.where ? params.where : '';
        console.log(params);
        let sql = "SELECT users.id, users.name, users.surename, users.role, users.login, users.is_active, user_roles.role_name AS status_text FROM users LEFT JOIN user_roles ON users.role = user_roles.id " + 
                this._whereString(params.where) + this._limitString(params.limit) + this._offsetString(params.offset);
        console.log(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows,fields)=>{
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }
    getUsers(params){
        let sql = "SELECT users.id, users.name, users.surename, users.login, users.role, users.is_active FROM users";
        return new Promise((resolve, reject) => {
            db.query(sql, (err,rows) => {
                if(err) return reject(err);
                
                return resolve(rows);
            })
        })
    }

    getUsersRoles(){
        let sql = "SELECT * FROM user_roles";
        return new Promise((resolve, reject) => {
            db.query(sql, (err,rows) => {
                if(err) return reject(err);
                
                return resolve(rows);
            })
        })
    }

    getCount(params){
        console.log("start getcount");
        params.where = params.where ? params.where : '';
        let sql = "SELECT count(id) as count FROM users " + this._whereString(params.where) + this._limitString(params.limit) + this._offsetString(params.offset);            
        //super.query(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                console.log(rows);
                return resolve(rows);
            })
        })        
    }
}
