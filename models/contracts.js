var db = require('../dbconn');

const Contracts = {
    getContracts : function(params,limit,offset,callback){
        //return db.query("SELECT * FROM contracts "+this.whereString(params + this.limitString(limit))+this.offsetString(offset));
       return "SELECT * FROM contracts "+ this.whereString(params) + this.limitString(limit) + this.offsetString(offset);
    },
    limitString : function(limit){
        return  limit ? ` LIMIT ${limit}` : ``;
    },
    offsetString : function(offset){
        return offset ? ` OFFSET ${offset}` : ``;
    },
    whereString : function(params){
        var whereStr = '';
        if(params.hasOwnProperty('contract_number')){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contract_number = ${params.contract_number}`}
        if(params.hasOwnProperty('address')){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE %'${params.address}'%`}
        if(params.hasOwnProperty('contractor')){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contractor = ${params.contractor}`}
        if(params.hasOwnProperty('status')){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `status = ${params.status}`}
        //if(params.hasOwnProperty())
        //if(params.hasOwnProperty())
        //if(params.hasOwnProperty())
        return whereStr;
    }
}

module.exports = Contracts;