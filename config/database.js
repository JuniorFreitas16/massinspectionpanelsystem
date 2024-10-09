const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'seda', 'Seda@2024', {
  host: '52.67.247.40',
  dialect: 'mysql'
});

module.exports = sequelize;
