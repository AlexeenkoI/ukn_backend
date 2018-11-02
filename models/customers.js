var db = require('../dbconn');
var Table = require('./table');

module.exports = class Customers extends Table{
    constructor(){
        const structure = {
            id : '',
            ctime : '',
            name : '',
            firstname : '',
            secondname : '',
            email : '',
            phone : ''
        }
        const tableName = "customer";
        super(tableName, structure)
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
        if(params.hasOwnProperty('name')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `name = '${params.name}'` }
        if(params.hasOwnProperty('firstname')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `firstname = '${params.firstname}'` }
        if(params.hasOwnProperty('secondname')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `secondname = '${params.secondname}'` }
        if(params.hasOwnProperty('email')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `email = '${params.email}'` }
        if(params.hasOwnProperty('phone')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `phone = '${params.phone}'` }
        return whereStr;
    }
    
 
    getCustomers(params){            
        params.where = params.where ? params.where : '';
        let sql = "SELECT * FROM customer " + this._whereString(params.where) + this._limitString(params.limit) + this._offsetString(params.offset);        
        console.log(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }

}
