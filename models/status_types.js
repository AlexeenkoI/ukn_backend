var db = require('../dbconn');
var Table = require('./table');

module.exports = class StatusType extends Table{
    constructor(){
        const structure = {
            id : '',
            type : ''
        }
        const tableName = "status_types";
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
        if(params.hasOwnProperty('type')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `type = '${params.type}'` }
        
        return whereStr;
    }

    getStatusTypes(params){            
        params.where = params.where ? params.where : '';
        let sql = "SELECT * FROM status_types " + this._whereString(params.where) + this._limitString(params.limit) + this._offsetString(params.offset);        
        console.log(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }
}