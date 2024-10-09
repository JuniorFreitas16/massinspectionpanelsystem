const express = require('express');
const InspectionModel = require('../models/InspectionModel');
const router = express.Router();

// Rota para criar novo registro
router.post('/add', async (req, res) => {
    try {
        const newInspection = await InspectionModel.create(req.body);
        res.status(200).json(newInspection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para listar os registros
router.get('/list', async (req, res) => {
    try {
        const inspections = await InspectionModel.findAll();
        res.status(200).json(inspections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para deletar um registro
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await InspectionModel.destroy({ where: { id } });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para editar um registro
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await InspectionModel.update(req.body, { where: { id } });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
