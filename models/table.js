var db = require('../dbconn');
var mysql = require('mysql');


/*
core tableClass for all models
*   @return Promise in all query functions
*/

module.exports = class Table{
    constructor(tableName,structure){
        this._tableStructure = structure;
        this._tableName = tableName;
    }
    _makeQueryStructure(structure){
        var res  = [];
        for(var key in structure){
            if(structure.hasOwnProperty(key)){
                res.push(key);
            }
        }
        return res.join(',');
    }


    update(id,data){
        var dataArr = [];
        console.log('core updater');
        console.log(data);
        var structArr = [];
        for(var key in data){
            if(data.hasOwnProperty(key) && data[key]!=='' && key !=='id'){
                console.log('in cicle');
                console.log(data[key]);
                dataArr.push(`${key}='${data[key]}'`);
            }
        }
        console.log(dataArr);
        var dataStr = dataArr.join(',');
        var sql = "UPDATE " + this._tableName + " SET " + dataStr + " WHERE id = " + db.escape(id);

        console.log('update query');
        console.log(sql);
        return new Promise((resolve,reject) => {
            db.query(sql,(err,rows,fields) => {
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }
    insert(data){
        console.log(data);
        var dataArr = [];
        var structArr = [];
        for(var key in data){
            if(this._tableStructure.hasOwnProperty(key) && data[key]!==''){
                structArr.push(key);
                if(data.hasOwnProperty(key) && data[key]!==''){
                    if(data[key] === true){
                        data[key] = 1;
                    }
                    if(data[key] === false){
                        data[key] = 0;
                    }
                    dataArr.push(`'${data[key]}'`);
                }
            }
        }
        var dataStr = dataArr.join(',');
        var structStr = structArr.join(',');
        var sql = "INSERT INTO " + this._tableName + " (" + structStr + ") " + " VALUES (" + dataStr + ")";
        console.log('insert query');
        console.log(sql);
        return new Promise((resolve,reject) => {
            db.query(sql,(err,rows,fields) => {
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }
    delete(id){
        console.log('delete query');
        var sql = "DELETE FROM " + this._tableName + " WHERE id = " + db.escape(id);
        console.log(sql);
        return new Promise((resolve,reject) => {
            db.query(sql,(err,rows,fields) => {
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }
}
