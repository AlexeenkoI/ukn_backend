var db = require('../dbconn');
var Table = require('./table');

modyle.exports = class Contracts extends Table{
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

    _whereString(params){
        let whereStr = '';
        if(params.hasOwnProperty('id')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.id = '${params.id}'` }
        if(params.hasOwnProperty('name')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.name = '${params.name}'` }
        if(params.hasOwnProperty('firstname')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.firstname = '${params.firstname}'` }
        if(params.hasOwnProperty('secondname')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.secondname = '${params.secondname}'` }
        if(params.hasOwnProperty('email')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.email = '${params.email}'` }
        if(params.hasOwnProperty('phone')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.phone = '${params.phone}'` }
        return whereStr;
    }

    getCustomers(){
        let sql = "SELECT * FROM customer ";
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }

    



}

