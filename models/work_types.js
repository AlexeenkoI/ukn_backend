var db = require('../dbconn');
var Table = require('./table');

module.exports = class WorkType extends Table{
    constructor(){
        const structure = {
            id : '',
            work_type : ''
        }
        const tableName = "work_types";
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
        if(params.hasOwnProperty('work_type')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `work_type = '${params.work_type}'` }
        
        return whereStr;
    }

    getWorkTypes(params){            
        params.where = params.where ? params.where : '';
        let sql = "SELECT * FROM work_types " + this._whereString(params.where) + this._limitString(params.limit) + this._offsetString(params.offset);        
        console.log(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }
}