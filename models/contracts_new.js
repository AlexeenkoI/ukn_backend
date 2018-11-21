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
       console.log('where str');
       console.log(params.user_id);
        if(params && params == 'undefined') params = {};
        var whereStr = '';
        if(params.hasOwnProperty('id') && params.id !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contracts.id = '${params.id}'` }
        if(params.hasOwnProperty('contract_number') && params.contract_number !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contract_number LIKE '%${params.contract_number}%'` }
        //if(params.hasOwnProperty('customer') && params.customer !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE '%${params.customer}%'` }
        if(params.hasOwnProperty('address') && params.address !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE '%${params.address}%'` }
        //if(params.hasOwnProperty('contractor') && params.contractor !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contractor = '${params.contractor}'` }
        if(params.hasOwnProperty('status') && params.status !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `status = '${params.status}'` }
        if(params.hasOwnProperty('type_of_work') && params.type_of_work !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `type_of_work = '${params.type_of_work}'` }
        if(params.hasOwnProperty('date_started') && params.date_started !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `date_started >= '${params.date_started}'` }
        if(params.hasOwnProperty('customer_id') && params.customer_id  > 0){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `customer_id = '${params.customer_id}'` }
        if(params.hasOwnProperty('date_deadline') && params.date_deadline !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `date_deadline <= '${params.date_deadline}'` }
        if(params.hasOwnProperty('whereString') && params.whereString !==''){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `CONCAT(contract_number,' ',address,' ',contractor) LIKE '%${params.whereString}%'`}
        if(params.hasOwnProperty('performers_id') && params.performers_id !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `performers_id = '${params.performers_id}'` }
        if(params.hasOwnProperty('user_id')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + params.user_id.reduce(function(str, value){str + ' ' + value + ' AND '}, whereStr) }        
        //if(params.hasOwnProperty('name')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.name like '%${params.name}%'` }
        //if(params.hasOwnProperty('surename')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.surename like '%${params.surename}%'` }



        return whereStr;
    }

    getContracts(params){  
    console.log('pre  params');
    console.log(params);
    let sql = "SELECT c.id, c.contract_number, date_format(from_unixtime(c.date_started), '%d/%m/%Y') as date_started, date_format(from_unixtime(c.date_deadline), '%d/%m/%Y') as date_deadline, c.customer, c.customer_id, c.address, c.geodetic_survey,c.type_of_work, c.contractor, c.price, c.comment, c.status FROM contracts as c " + this._whereString(params) + this._limitString(params.limit) + this._offsetString(params.offset);
    //let sql = 'SELECT contracts.id, contracts.contract_number, date_format(from_unixtime(contracts.date_started), \'%Y-%m-%d\') as date_started, date_format(from_unixtime(contracts.date_deadline), \'%Y-%m-%d\') as date_deadline, contracts.customer, contracts.customer_id, contracts.address, contracts.geodetic_survey,contracts.type_of_work, contracts.contractor, contracts.price, contracts.comment, contracts.status, users.name, users.id FROM contracts LEFT JOIN performes on contracts.performers_id = performes.id left join users on performes.user_id = users.id ' + this._whereString(params) + this._limitString(params.limit) + this._offsetString(params.offset);
    console.log(sql);
    return new Promise((resolve,reject) => {
        db.query(sql,(err,rows,field)=>{
            if(err) return reject(err);
            resolve(rows);
        })
    })
}

    getCount(params){
        console.log("start getcount");        
        let sql = "SELECT count(contracts.id) as count FROM contracts " + this._whereString(params) + this._limitString(params.limit) + this._offsetString(params.offset);            
        //super.query(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                console.log(rows);
                return resolve(rows);
            })
        })        
    }
}
