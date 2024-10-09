const express = require('express');
const { Model, InspectionPlan, Inspection } = require('./models');

const app = express();
app.use(express.json());

// Rota para adicionar um novo modelo
app.post('/model/add', async (req, res) => {
  try {
    const model = await Model.create(req.body);
    res.status(201).json(model);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para adicionar um novo plano de inspeção
app.post('/plan/add', async (req, res) => {
  try {
    const inspectionPlan = await InspectionPlan.create(req.body);
    res.status(201).json(inspectionPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar todos os planos de inspeção
app.get('/plans', async (req, res) => {
  try {
    const plans = await InspectionPlan.findAll();
    res.status(200).json(plans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para adicionar um novo registro de inspeção
app.post('/inspection/add', async (req, res) => {
  try {
    const inspection = await Inspection.create(req.body);
    res.status(201).json(inspection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar todas as inspeções
app.get('/inspections', async (req, res) => {
  try {
    const inspections = await Inspection.findAll();
    res.status(200).json(inspections);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Porta de escuta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// P.O code generate
document.addEventListener("DOMContentLoaded", function() {
  const poInput = document.getElementById("po");

  function generatePO() {
      const date = new Date();
      const formattedDate = date.toISOString().replace(/[-T:.Z]/g, '').substring(0, 14);
      const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return formattedDate + sequence;
  }

  poInput.value = generatePO();
});
