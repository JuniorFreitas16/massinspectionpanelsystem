const { Sequelize } = require('sequelize');

// Configuração da conexão com o MySQL
const sequelize = new Sequelize('panel_inspection', 'seda', 'Seda@2024', {
  host: '52.67.247.40',  // Ex: '18.231.225.95'
  dialect: 'mysql'
});

// Teste da conexão
sequelize.authenticate()
  .then(() => console.log('Conectado com sucesso ao banco de dados MySQL!'))
  .catch(err => console.error('Erro ao conectar ao MySQL:', err));

module.exports = sequelize;
