/*
var mysql = require('mysql');

var connection = mysql.createPool({
  host     : '213.183.51.110',
  port : '3306',
  user     : 'igor',
  password : 'deDnmr1x',
  database : 'ukn',
  dateStrings: true
});
module.exports = connection;
*/

const Sequelize = require('sequelize');
// Or you can simply use a connection uri
//const sequelize = new Sequelize('mysql://igor:deDnmr1x@213.183.51.110:3306/ukn');
const sequelize = new Sequelize('ukn', 'igor', 'deDnmr1x', {
    dialect: 'mysql',
    host: "213.183.51.110",   
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    }, 
    define: {
      underscored: false,
      freezeTableName: false,
      //timestaps:false
    },
    //timestamps: false
  })

  /**
   * Проверка успешного коннекта к базе.
   */
  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize