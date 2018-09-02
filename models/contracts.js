var db = require('../dbconn');
var mysql = require('mysql');
var Table = require('./table');

module.exports = class Contracts extends Table{
    constructor(){
        const structure = {
            contract_number : '1',
            date_started : (new Date).getTime(),
            date_deadline : '1234',
            customer: '1',
            сustomer_id: '',
            address : '',
            geodetic_survey : '',
            type_of_work : '',
            contractor : '1',
            price : '1234',
            comment : 'adasd',
            status : '1',
        }
        const tableName = "contracts";
        super(tableName,structure);
    }

    _limitString(limit){
        return  limit ? ` LIMIT ${limit}` : ``;
    }

    _offsetString(offset){
        return offset ? ` OFFSET ${offset}` : ``;
    }

    _order(){
        return order ? `ORDER BY ${order} ${type}` : `ORDER BY id DESC`;
    }

    _whereString(params){
        /*
        TODO
        additional options
        */
        var whereStr = '';
        if(params.hasOwnProperty('contract_number')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contract_number = '${params.contract_number}'` }
        if(params.hasOwnProperty('address')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE '%${params.address}%'` }
        if(params.hasOwnProperty('contractor')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contractor = '${params.contractor}'` }
        if(params.hasOwnProperty('status')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `status = '${params.status}'` }
        return whereStr;
    }

    getContracts(params,limit,offset){
        let sql = "SELECT * FROM contracts "+ this._whereString(params) + this._limitString(limit) + this._offsetString(offset);
        return new Promise((resolve,reject) => {
            db.query(sql,(err,rows,field)=>{
                if(err) return reject(err);
                resolve(rows);
            })
        })
    }

    getCountRows(){
        let sql = "SELECT COUNT(*) FROM contracts "+ this._whereString(params) + this._limitString(limit) + this._offsetString(offset);
        return new Promise((resolve,reject) => {
            db.query(sql,(err,rows,field)=>{
                if(err) return reject(err);
                resolve(rows);
            })
        })
    }
}
