const Sequelize = require('sequelize');

module.exports = class Token extends Sequelize.Model{
    static init(sequelize, Sequelize){
        console.log("start token init");
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey : true,
                    autoIncrement: true,
                },
                token : Sequelize.STRING,
                expires_date : Sequelize.INTEGER
            },{
                timestamps : false,
                tableName : 'tokens',
                sequelize
            }
        );
    }
}