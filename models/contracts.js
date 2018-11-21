/*
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
       
       console.log('where str');
       console.log(params);
        if(params && params == 'undefined') params = {};
        var whereStr = '';
        if(params.hasOwnProperty('id') && params.id !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contracts.id = '${params.id}'` }
        if(params.hasOwnProperty('contract_number') && params.contract_number !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contract_number LIKE '%${params.contract_number}%'` }
        if(params.hasOwnProperty('customer') && params.customer !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE '%${params.customer}%'` }
        if(params.hasOwnProperty('address') && params.address !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `address LIKE '%${params.address}%'` }
        if(params.hasOwnProperty('contractor') && params.contractor !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `contractor = '${params.contractor}'` }
        if(params.hasOwnProperty('status') && params.status !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `status = '${params.status}'` }
        if(params.hasOwnProperty('type_of_work') && params.type_of_work !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `type_of_work = '${params.type_of_work}'` }
        if(params.hasOwnProperty('date_started') && params.date_started !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `date_started >= '${params.date_started}'` }
        if(params.hasOwnProperty('customer_id') && params.customer_id  > 0){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `customer_id = '${params.customer_id}'` }
        if(params.hasOwnProperty('date_deadline') && params.date_deadline !==''){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `date_deadline <= '${params.date_deadline}'` }
        if(params.hasOwnProperty('whereString') && params.whereString !==''){whereStr += (whereStr ? ' AND ' : 'WHERE ') + `CONCAT(contract_number,' ',address,' ',contractor) LIKE '%${params.whereString}%'`}
        if(params.hasOwnProperty('user_id')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.id = '${params.user_id}'` }        
        if(params.hasOwnProperty('name')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.name like '%${params.name}%'` }
        if(params.hasOwnProperty('surename')){ whereStr += (whereStr ? ' AND ' : 'WHERE ') + `users.surename like '%${params.surename}%'` }



        return whereStr;
    }

    getContracts(params){  
    console.log('pre  params');
    console.log(params);
    //let sql = "SELECT c.id, c.contract_number, date_format(from_unixtime(c.date_started), '%d/%m/%Y') as date_started, date_format(from_unixtime(c.date_deadline), '%d/%m/%Y') as date_deadline, c.customer, c.сustomer_id, c.address, c.geodetic_survey,c.type_of_work, c.contractor, c.price, c.comment, c.status, users.name FROM u0579301_ukn.contracts as c LEFT JOIN u0579301_ukn.users on c.contractor = users.id" + this._whereString(where) + this._limitString(limit) + this._offsetString(offset);
    let sql = 'SELECT contracts.id, contracts.contract_number, date_format(from_unixtime(contracts.date_started), \'%Y-%m-%d\') as date_started, date_format(from_unixtime(contracts.date_deadline), \'%Y-%m-%d\') as date_deadline, contracts.customer, contracts.customer_id, contracts.address, contracts.geodetic_survey,contracts.type_of_work, contracts.contractor, contracts.price, contracts.comment, contracts.status, users.name, users.id FROM contracts LEFT JOIN performes on contracts.performers_id = performes.id left join users on performes.user_id = users.id ' + this._whereString(params) + this._limitString(params.limit) + this._offsetString(params.offset);
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
        let sql = "SELECT count(contracts.id) as count FROM contracts LEFT JOIN performes on contracts.performers_id = performes.id left join users on performes.user_id = users.id " + this._whereString(params) + this._limitString(params.limit) + this._offsetString(params.offset);            
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
*/

//const sequelize = require('../dbconn');
const Sequelize = require('sequelize');
const Customer = require('./customers');
const Work_type = require('./work_types');
const Status_type = require('./status_types');
//const User = require('./users');



module.exports = class Contracts extends Sequelize.Model{
    

    static init(sequelize, Sequelize){

        //const sequelize = new Sequelize();
        console.log("start init contract");
        return super.init(
            {
                
               
            
        //this.contract = sequelize.define('contract',{
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey : true,
                    autoIncrement: true,
                },
                contract_number : Sequelize.INTEGER,
                date_started : Sequelize.INTEGER,
                date_deadline : Sequelize.INTEGER,
                customer_id : Sequelize.INTEGER,
                address : Sequelize.STRING, 
                geodetic_survey : Sequelize.STRING,
                type_of_work : Sequelize.INTEGER,
                price:Sequelize.DECIMAL,
                comment:Sequelize.TEXT,
                status:Sequelize.INTEGER

                
            },        
            {
                timestamps:false,
                //underscored: false,
                //freezeTableName: false,
                tableName : 'contracts',
                sequelize   
            }
       
        );
    }

    static associate(models){
        this.myAssosiation = this.belongsTo(models.Customer, {foreignKey : 'customer_id'});
        this.myAssosiation = this.belongsTo(models.Work_type, {foreignKey : 'type_of_work'});
        this.myAssosiation = this.belongsTo(models.Status_type, {foreignKey : 'status'});
    //Contract.hasMany(Performes, {foreignKey : 'contract_id'});
        this.myAssosiation = this.belongsToMany(User, {through:Performes, foreignKey : "contract_id"});
    }

    GetContracts(params){
        console.log("start getcontract");
        return this.findAndCountAll({
            //include:[Customer]
            include : [{
                model :  Work_type         
                //where : { id: 2},
                //required : truefg
            },{
                model : Status_type
            },{
                model : Customer
            }
            ,{
                model:User,       
                where : {login : "komkim"}            
            }
        ]})
    }
}  



/*
   const Contracts = sequelize.define('contract',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true,
      },
    contract_number : Sequelize.INTEGER,
    date_started : Sequelize.INTEGER,
    date_deadline : Sequelize.INTEGER,
    customer_id : Sequelize.INTEGER,
    address : Sequelize.STRING, 
    geodetic_survey : Sequelize.STRING,
    type_of_work : Sequelize.INTEGER,
    price:Sequelize.DECIMAL,
    comment:Sequelize.TEXT,
    status:Sequelize.INTEGER
},{
    timestamps:false,
    underscored: false,
    freezeTableName: false
});

Contracts.associate = (models) => {
    this.belongsTo(models.Customer, {foreignKey : 'customer_id'});
    this.belongsTo(models.Work_type, {foreignKey : 'type_of_work'});
    this.belongsTo(models.Status_type, {foreignKey : 'status'});
    //Contract.hasMany(Performes, {foreignKey : 'contract_id'});
    this.belongsToMany(User, {through:Performes, foreignKey : "contract_id"});
}

Contracts.prototype.GetContracts = (params) => {
    //Console.log("start get contract");
    this.findAndCountAll({
        //include:[Customer]
        include : [{
            model :  Work_type         
            //where : { id: 2},
            //required : truefg
        },{
            model : Status_type
        },{
            model : Customer
        }
        ,{
            model:User,       
            where : {login : "komkim"}            
        }
    ]})
}

module.exports = Contracts;

*/


/*
module.exports = class Contracts extends Sequelize.Model{
}

Contracts.init({
            
        //this.contract = sequelize.define('contract',{
            id: {
                type: DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement: true,
            },
            contract_number : DataTypes.INTEGER,
            date_started : DataTypes.INTEGER,
            date_deadline : DataTypes.INTEGER,
            customer_id : DataTypes.INTEGER,
            address : DataTypes.STRING, 
            geodetic_survey : DataTypes.STRING,
            type_of_work : DataTypes.INTEGER,
            price:DataTypes.DECIMAL,
            comment:DataTypes.TEXT,
            status:DataTypes.INTEGER
        },{
            timestamps:false,
            //underscored: false,
            //freezeTableName: false,
            tableName : 'contracts',
            sequelize
        
    });

Contract.associate({
        Contract.belongsTo(models.Customer, {foreignKey : 'customer_id'});
        this.myAssosiation = this.belongsTo(models.Work_type, {foreignKey : 'type_of_work'});
        this.myAssosiation = this.belongsTo(models.Status_type, {foreignKey : 'status'});
    //Contract.hasMany(Performes, {foreignKey : 'contract_id'});
        this.myAssosiation = this.belongsToMany(User, {through:Performes, foreignKey : "contract_id"});
    }

    GetContracts(params){
        console.log("start getcontract");
        return this.findAndCountAll({
            //include:[Customer]
            include : [{
                model :  Work_type         
                //where : { id: 2},
                //required : truefg
            },{
                model : Status_type
            },{
                model : Customer
            }
            ,{
                model:User,       
                where : {login : "komkim"}            
            }
        ]})
    }
}  

*/

    


