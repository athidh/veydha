const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Veydha Backend API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

module.exports = app;