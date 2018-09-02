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
        var structArr = [];
        for(var key in data){
            if(data.hasOwnProperty(key) && data[key]!==''){
                //console.log(data[key])
                dataArr.push(`${key}=${data[key]}`);
            }
        }
        var dataStr = dataArr.join(',');
        var sql = "UPDATE " + this._tableName + " SET " + db.escape(dataStr) + " WHERE id = " + db.escape(id);

        console.log('update query');
        console.log(sql);
        //return new Promise((resolve,reject) => {
        //    db.query(sql,(err,rows,fields) => {
        //        if(err) return reject(err);
        //        return resolve(rows);
        //    })
        //})
    }
    insert(data){
        var dataArr = [];
        var structArr = [];
        for(var key in data){
            if(this._tableStructure.hasOwnProperty(key) && data[key]!==''){
                structArr.push(key);
                if(data.hasOwnProperty(key) && data[key]!==''){
                    dataArr.push(data[key]);
                }
            }
        }
        var dataStr = dataArr.join(',');
        var structStr = structArr.join(',');
        var sql = "INSERT INTO " + this._tableName + " (" + structStr + ") " + " VALUES (" + mysql.escape(dataStr) + ")";
        console.log('insert query');
        console.log(sql);
        //return new Promise((resolve,reject) => {
        //    db.query(sql,(err,rows,fields) => {
        //        if(err) return reject(err);
        //        return resolve(rows);
        //    })
        //})
    }
    delete(id){
        console.log('delete query');
        var sql = "DELETE FROM " + this._tableName + " WHERE id = " + db.escape(id);
        console.log(sql);
        //return new Promise((resolve,reject) => {
        //    db.query(sql,(err,rows,fields) => {
        //        if(err) return reject(err);
        //        return resolve(rows);
        //    })
        //})
    }
}
