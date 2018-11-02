var db = require('../dbconn');
var Table = require('./table');

module.exports = class RoleName extends Table{
    constructor(){
        const structure = {
            id : '',
            role_name : ''
        }
        const tableName = "user_roles";
        super(tableName, structure);
    }

    _limitString(limit){
        return  limit ? ` LIMIT ${limit}` : ``;
    }  
    
    _offsetString(offset){
        return offset ? ` OFFSET ${offset}` : ``;
    }

    _whereString(params){
        let whereStr = '';
        if(params.hasOwnProperty('id')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `id = '${params.id}'` }
        if(params.hasOwnProperty('role_name')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `role_name = '${params.role_name}'` }
        
        return whereStr;
    }

    getUserRoles(params){            
        params.where = params.where ? params.where : '';
        let sql = "SELECT * FROM user_roles " + this._whereString(params.where) + this._limitString(params.limit) + this._offsetString(params.offset);        
        console.log(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }
}