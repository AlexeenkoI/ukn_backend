/*
var db = require('../dbconn');
var Table = require('./table');

module.exports = class Performers extends Table{
    constructor(){
        const structure = {
            id:'',
            ctime:'',
            contract_id:'',
            customer_id:''
        }
        const tableName = "performes";
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
        if(params.hasOwnProperty('ctime')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `ctime = '${params.id}'` }
        if(params.hasOwnProperty('contract_id')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contract_id = '${params.id}'` }
        if(params.hasOwnProperty('customer_id')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `customer_id = '${params.id}'` }
    }

    GetPerformers(params){
        params.where = params.where ? params.where : '';
        let limit = params.where.limit ? params.where.limit : '';
        let offset = params.where.offset ? params.where.offset : '';
        console.log("getPerformers");

        let sql = "SELECT * FROM performes " + this._whereString(params.where) + this._limitString(limit) + this._offsetString(offset);        
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
        let sql = "SELECT count(id) as count FROM performes " + this._whereString(params.where) + this._limitString(limit) + this._offsetString(offset);            
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

const Sequelize = require('sequelize');


module.exports = class Perform extends Sequelize.Model{
    static init (sequelize, Sequelize){
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey : true,
                    autoIncrement: true,
                },
                ctime : Sequelize.DATE,
                contract_id : Sequelize.INTEGER,
                user_id : Sequelize.INTEGER
            },
            {
                timestamps:false,
                tableName : 'performes',
                sequelize
            }   
            

        );
    }
}
