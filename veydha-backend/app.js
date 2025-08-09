const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080', 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from your origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Veydha Backend API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);


module.exports = app;