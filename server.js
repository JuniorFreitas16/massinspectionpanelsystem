const express = require('express');
const sequelize = require('./db');
const inspectionRoutes = require('./inspection');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/inspection', inspectionRoutes);

sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(error => {
    console.log('Error syncing database:', error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
