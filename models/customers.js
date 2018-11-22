
/*var db = require('../dbconn');
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
        console.log(params);
        let whereStr = '';
        if(params.hasOwnProperty('id')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `id = '${params.id}'` }
        if(params.hasOwnProperty('name')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `name LIKE '%${params.name}%'` }
        if(params.hasOwnProperty('firstname')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `firstname LIKE '%${params.firstname}%'` }
        if(params.hasOwnProperty('secondname')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `secondname LIKE '%${params.secondname}%'` }
        if(params.hasOwnProperty('email')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `email LIKE '%${params.email}%'` }
        if(params.hasOwnProperty('phone')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `phone LIKE '%${params.phone}%'` }
        if(params.hasOwnProperty('whereString') && params.whereString !==''){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `CONCAT(name,' ',firstname,' ', secondname) LIKE '%${params.whereString}%'`}
        return whereStr;
    }
    
 
    getCustomers(params){
        params.where = params.where ? params.where : '';
        let limit = params.where.limit ? params.where.limit : '';
        let offset = params.where.offset ? params.where.offset : '';

        let sql = "SELECT * FROM customer " + this._whereString(params.where) + this._limitString(limit) + this._offsetString(offset);        
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
        let limit = params.where.limit ? params.where.limit : '';
        let offset = params.where.offset ? params.where.offset : '';
        let sql = "SELECT count(id) as count FROM customer " + this._whereString(params.where) + this._limitString(limit) + this._offsetString(offset);            
        //super.query(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);                
                return resolve(rows);
            })
        })        
    }

}
*/

/*

var sequelize = require('../dbconn');

module.exports.Customers = sequelize.define('customer', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
      },
    ctime : Sequelize.DATE,
    name: Sequelize.STRING,
    firstname : Sequelize.STRING,
    secondname : Sequelize.STRING,
    email : Sequelize.STRING,
    phone : Sequelize.STRING
},{
    timestamps:false
});
*/

const Sequelize = require('sequelize');

module.exports = class Customer extends Sequelize.Model{
    static init(sequelize, Sequelize){        
        console.log("start init customer");
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey : true,
                    autoIncrement: true,
                  },
                ctime : Sequelize.DATE,
                name: Sequelize.STRING,
                firstname : Sequelize.STRING,
                secondname : Sequelize.STRING,
                email : Sequelize.STRING,
                phone : Sequelize.STRING
            },
            {
                timestamps:false,
                tableName : 'customers',
                sequelize  
            }
        );
    }    
}