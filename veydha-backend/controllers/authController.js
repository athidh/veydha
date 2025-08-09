const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Patient = require('../models/patientModel');
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });
};
const registerPatient = asyncHandler(async (req, res) => {
  const { patientId, name, password, age, gender } = req.body;

  if (!patientId || !name || !password) {
    res.status(400);
    throw new Error('Please provide patientId, name, and password');
  }

  // Check if patient already exists
  const patientExists = await Patient.findOne({ patientId });
  if (patientExists) {
    res.status(400);
    throw new Error('Patient with this ID already exists');
  }

  // Create new patient
  const patient = await Patient.create({
    patientId,
    name,
    password,
    age,
    gender,
  });

  if (patient) {
    const token = generateToken(patient._id);
    res.status(201).json({
      _id: patient._id,
      patientId: patient.patientId,
      name: patient.name,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid patient data');
  }
});

//login patient
const loginPatient = asyncHandler(async (req, res) => {
  const { patientId, password } = req.body;

  const patient = await Patient.findOne({ patientId }).select('+password');
  
  if (patient && (await patient.correctPassword(password, patient.password))) {
    const token = generateToken(patient._id);
    res.json({
      _id: patient._id,
      patientId: patient.patientId,
      name: patient.name,
      token: token,
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Invalid Patient ID or Password');
  }
});

module.exports = {
  registerPatient,
  loginPatient,
};