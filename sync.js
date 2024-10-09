const sequelize = require('./db');
const { Model, InspectionPlan, Inspection } = require('./models');

sequelize.sync({ force: false })  // force: true sobrescreve as tabelas
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao sincronizar tabelas:', error);
  });