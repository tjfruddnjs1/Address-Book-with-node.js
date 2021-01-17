const Sequelize = require('sequelize');

module.exports = class Contact extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        primaryKey : true,
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      email : {
        type: Sequelize.STRING(50),
      },
      phone: {
        type: Sequelize.STRING(45),
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Contact',
      tableName: 'contacts',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};