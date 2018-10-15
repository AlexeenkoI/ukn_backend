var db = require('../dbconn');
var crypto = require('crypto');
var Table = require('./table');

module.exports = class User extends Table{
    constructor(){
        const structure = {
            name : '',
            surename : '',
            login : '',
            password : '',
            role : ''
        }
        const tableName = 'users';
        super(tableName,structure);
    }

    update(data){
        if(data.hasOwnProperty('password') && password !=''){
            data.password = this._hasher(data.password);
        }
        super.update(data);
    }

    insert(data){
        if(data.hasOwnProperty('password') && password !=''){
            data.password = this._hasher(data.password);
        }
        super.insert(data);
    }

    _hasher(value){
        return crypto.createHash('md5').update(value).digest('hex')
    }

    _whereString(params){
        let whereStr = '';
        if(params.hasOwnProperty('id')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.id = '${params.id}'` }
        if(params.hasOwnProperty('login')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.login = '${params.login}'` }
        if(params.hasOwnProperty('password')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.password = '${crypto.createHash('md5').update(params.password).digest('hex')}'` }
        return whereStr;
    }
    getUser(params){
        let sql = "SELECT users.id, users.name, users.surename, users.role, user_roles.role_name AS status_text FROM users LEFT JOIN user_roles ON users.role = user_roles.id " + 
                this._whereString(params);
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
}
