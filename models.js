const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Modelo de Modelos
const Model = sequelize.define('Model', {
  plant: DataTypes.STRING,
  part_type: DataTypes.STRING,
  part_number: DataTypes.STRING,
  model: DataTypes.STRING,
  vendor: DataTypes.STRING,
  box_qty: DataTypes.INTEGER
}, { tableName: 'models' });

// Modelo de Planos de Inspeção
const InspectionPlan = sequelize.define('InspectionPlan', {
  po_code: DataTypes.STRING(20), 
  plan_date: DataTypes.DATE,
  line: DataTypes.STRING,
  part_number: DataTypes.STRING,
  model: DataTypes.STRING,
  vendor: DataTypes.STRING,
  plan_qty: DataTypes.INTEGER,
  part_type: DataTypes.STRING,
  box_qty: DataTypes.INTEGER,
  remark: DataTypes.TEXT
  
}, { tableName: 'inspection_plans' });

// Modelo de Inspeções
const Inspection = sequelize.define('Inspection', {
  date: DataTypes.DATE,
  time: DataTypes.TIME,
  part_number: DataTypes.STRING,
  model: DataTypes.STRING,
  serial_number: DataTypes.STRING,
  status: DataTypes.ENUM('OK', 'NG'),
  defect: DataTypes.STRING,
  part: DataTypes.STRING,
  area: DataTypes.STRING,
  photo: DataTypes.BLOB
}, { tableName: 'inspections' });

module.exports = { Model, InspectionPlan, Inspection };
