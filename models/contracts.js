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

    insert(data){          
        super.insert(data)
        .then(rows =>{            
            let sql = "CALL Contract_Update_Start(?)";
            return new Promise((resolve,reject) => {            
                console.log(sql);                     
                db.query(sql, [rows.insertId], (err) => {
                    if (err) return reject(err);                      
                    return resolve(rows);
                })  ;  
            })
        })
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
        if(params.hasOwnProperty('id') && params.id !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contracts.id = '${params.id}'` }
        if(params.hasOwnProperty('contract_number') && params.contract_number !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contract_number LIKE '%${params.contract_number}%'` }
        if(params.hasOwnProperty('customer') && params.customer !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE '%${params.customer}%'` }
        if(params.hasOwnProperty('address') && params.address !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE '%${params.address}%'` }
        if(params.hasOwnProperty('contractor') && params.contractor !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contractor = '${params.contractor}'` }
        if(params.hasOwnProperty('status') && params.status !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `status = '${params.status}'` }
        if(params.hasOwnProperty('type_of_work') && params.type_of_work !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `type_of_work = '${params.type_of_work}'` }
        if(params.hasOwnProperty('whereString') && params.whereString !==''){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `CONCAT(contract_number,' ',address,' ',contractor) LIKE '%${params.whereString}%'`}
        return whereStr;
    }

    /*
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

    getContract(params){
        let sql = "SELECT contracts.*,users.name FROM contracts "+ "LEFT JOIN users on contracts.contractor = users.id " + this._whereString(params);
        console.log(sql);
        return new Promise((resolve,reject) => {
            db.query(sql,(err,rows,field)=>{
                if(err) return reject(err);
                resolve(rows);
            })
        })
    }
    */



   getContracts(params){
    params.where = params.where ? params.where : '';
    //let sql = "SELECT c.id, c.contract_number, date_format(from_unixtime(c.date_started), '%d/%m/%Y') as date_started, date_format(from_unixtime(c.date_deadline), '%d/%m/%Y') as date_deadline, c.customer, c.сustomer_id, c.address, c.geodetic_survey,c.type_of_work, c.contractor, c.price, c.comment, c.status, users.name FROM u0579301_ukn.contracts as c LEFT JOIN u0579301_ukn.users on c.contractor = users.id" + this._whereString(where) + this._limitString(limit) + this._offsetString(offset);
    let sql = 'SELECT contracts.id, contracts.contract_number, date_format(from_unixtime(contracts.date_started), \'%d/%m/%Y\') as date_started, date_format(from_unixtime(contracts.date_deadline), \'%d/%m/%Y\') as date_deadline, contracts.customer, contracts.сustomer_id, contracts.address, contracts.geodetic_survey,contracts.type_of_work, contracts.contractor, contracts.price, contracts.comment, contracts.status, users.name FROM contracts LEFT JOIN users on contracts.contractor = users.id ' + this._whereString(params.where) + this._limitString(params.limit) + this._offsetString(params.offset);
    console.log(sql);
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
                db.query("SELECT id,name,surename,login, role FROM users",(err,rows,field) =>{
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
