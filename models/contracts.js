var db = require('../dbconn');
var mysql = require('mysql');
var Table = require('./table');

module.exports = class Contracts extends Table{
    constructor(){
        const structure = {
            contract_number : '',
            date_started : (new Date).getTime(),
            date_deadline : '',
            customer: '',
            сustomer_id: '',
            address : '',
            geodetic_survey : '',
            type_of_work : '',
            contractor : '',
            price : '',
            comment : '',
            status : '',
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
        if(params && params == 'undefined') params = {};
        var whereStr = '';
        if(params.hasOwnProperty('contract_number') && params.contract_number !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contract_number LIKE '%${params.contract_number}%'` }
        if(params.hasOwnProperty('customer') && params.customer !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE '%${params.customer}%'` }
        if(params.hasOwnProperty('address') && params.address !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE '%${params.address}%'` }
        if(params.hasOwnProperty('contractor') && params.contractor !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contractor = '${params.contractor}'` }
        if(params.hasOwnProperty('status') && params.status !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `status = '${params.status}'` }
        if(params.hasOwnProperty('type_of_work') && params.type_of_work !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `type_of_work = '${params.type_of_work}'` }
        if(params.hasOwnProperty('whereString') && params.whereString !==''){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `CONCAT(contract_number,' ',address,' ',contractor) LIKE '%${params.whereString}%'`}
        return whereStr;
    }

    getContracts(params,limit,offset){
        let sql = "SELECT contracts.*,users.name FROM contracts "+ "LEFT JOIN users on contracts.contractor = users.id " + this._whereString(params) + this._limitString(limit) + this._offsetString(offset);
        //console.log(sql);
        return new Promise((resolve,reject) => {
            db.query(sql,(err,rows,field)=>{
                if(err) return reject(err);
                resolve(rows);
            })
        })
    }

    getFilterData(){
        let sql = "SELECT status_types.* FROM status_types ";
        return new Promise((resolve,reject) => {
            let result = {};
            db.query(sql,(err,rows,field)=>{
                if(err) return reject(err);
                result.types = rows;
                db.query("SELECT * FROM users",(err,rows,field) =>{
                    if(err) reject(err);
                    result.users = rows;
                    resolve(result);
                })
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
