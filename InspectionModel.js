const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InspectionModel = sequelize.define('InspectionModel', {
  plant: { type: DataTypes.STRING, allowNull: false },
  partType: { type: DataTypes.STRING, allowNull: false },
  partNumber: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  vendor: { type: DataTypes.STRING, allowNull: false },
  boxQty: { type: DataTypes.INTEGER, allowNull: false }
}, {});

module.exports = InspectionModel;
