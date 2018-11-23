const Sequelize = require("sequelize");
const sequelize = require('../dbconn');
// pass your sequelize config here

const Contract = require("./contracts");
const Customer = require("./customers");
const Performer = require("./performers");
const StatusType = require("./status_types");
const Role = require("./user_roles");
const Work = require("./work_types");
const User = require("./users");
const Token = require("./token");


const models = {
  Contract : Contract.init(sequelize, Sequelize),  
  Performer: Performer.init(sequelize, Sequelize),
  StatusType: StatusType.init(sequelize, Sequelize),
  Customer: Customer.init(sequelize, Sequelize),
  
  Role: Role.init(sequelize, Sequelize),
  Work: Work.init(sequelize, Sequelize),
  User: User.init(sequelize, Sequelize),
  Token: Token.init(sequelize, Sequelize)
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach((model) => {
      console.log(model);
      model.associate(models)
  });

const db = {
  ...models,
  sequelize
};

module.exports = db;