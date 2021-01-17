const Sequelize = require("sequelize");
const Contact = require("./contact");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Contact = Contact;

Contact.init(sequelize);

Contact.associate(db);

module.exports = db;