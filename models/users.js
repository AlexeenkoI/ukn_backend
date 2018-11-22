/*

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
        if(params.hasOwnProperty('whereString') && params.whereString !==''){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `CONCAT(users.name,' ',users.surename) LIKE '%${params.whereString}%'`}
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
        let limit = params.where.limit ? params.where.limit : '';
        let offset = params.where.offset ? params.where.offset : '';
        console.log(params);
        let sql = "SELECT users.id, users.name, users.surename, users.role, users.login, users.is_active, user_roles.role_name AS status_text FROM users LEFT JOIN user_roles ON users.role = user_roles.id " + 
                this._whereString(params.where) + this._limitString(limit) + this._offsetString(offset);
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
        let limit = params.where.limit ? params.where.limit : '';
        let offset = params.where.offset ? params.where.offset : '';
        let sql = "SELECT count(id) as count FROM users " + this._whereString(params.where) + this._limitString(limit) + this._offsetString(offset);            
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

*/



const Sequelize = require('sequelize');
//const model = require('./init');

module.exports = class User extends Sequelize.Model{
    static init(sequelize, Sequelize){
        console.log("start user init");
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey : true,
                    autoIncrement: true,
                },
                name:Sequelize.STRING,
                surename: Sequelize.STRING,
                login: Sequelize.STRING,    
                role: Sequelize.INTEGER,
                is_active:Sequelize.STRING
            },{
                timestamps:false,
                tableName : 'users',
                sequelize
            }
        );
    }

    /*
    static associate(){
        this.myAssosiation = this.belongsTo(model.Role, {foreignKey : 'role'});
        this.myAssosiation = this.hasOne(model.Token, {foreignKey: 'user_id'});
        this.myAssosiation = this.belongsToMany(model.Contract, {through : Performes, foreignKey : "user_id"});
    }
    */
}


