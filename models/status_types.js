/*
var db = require('../dbconn');
var Table = require('./table');

module.exports = class StatusType extends Table{
    constructor(){
        const structure = {
            id : '',
            type : ''
        }
        const tableName = "status_types";
        super(tableName, structure);
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
        if(params.hasOwnProperty('type')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `type = '${params.type}'` }
        
        return whereStr;
    }

    getStatusTypes(params){            
        params.where = params.where ? params.where : '';
        let sql = "SELECT * FROM status_types " + this._whereString(params.where) + this._limitString(params.limit) + this._offsetString(params.offset);        
        console.log(sql);
        return new Promise((resolve, reject)=>{
            db.query(sql,(err,rows)=>{
                if(err) return reject(err);
                return resolve(rows);
            })
        })
    }
}
*/

//var sequelize = require('../dbconn');
const Sequelize = require('sequelize');

/*
module.exports.StatusType = sequelize.define('status_types', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    type : Sequelize.STRING
},{
    timestamps:false
});
*/


module.exports = class StatusType extends Sequelize.Model{

    static init(sequelize, Sequelize){        
        return super.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement: true,
            },
            type : Sequelize.STRING,
            //createdAt: Sequelize.DATE,
            //updatedAt: Sequelize.DATE,
        },{
            timestamps:false,
            tableName : 'status_types',
            sequelize
        });
    }   
}