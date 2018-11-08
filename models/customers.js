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
        if(params.hasOwnProperty('name')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `name LIKE '%${params.name}%'` }
        if(params.hasOwnProperty('firstname')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `firstname LIKE '%${params.firstname}%'` }
        if(params.hasOwnProperty('secondname')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `secondname LIKE '%${params.secondname}%'` }
        if(params.hasOwnProperty('email')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `email LIKE '%${params.email}%'` }
        if(params.hasOwnProperty('phone')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `phone LIKE '%${params.phone}%'` }
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

    getCount(params){
        console.log("start getcount");
        params.where = params.where ? params.where : '';
        let sql = "SELECT count(id) as count FROM customer " + this._whereString(params.where) + this._limitString(params.limit) + this._offsetString(params.offset);            
        //super.query(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);                
                return resolve(rows);
            })
        })        
    }

}
