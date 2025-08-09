const asyncHandler = require('express-async-handler');
const Patient = require('../models/patientModel');


const getMyProfile = asyncHandler(async (req, res) => {
  const patient = req.patient;

  if (patient) {
    res.status(200).json(patient);
  } else {
    res.status(404);
    throw new Error('Patient not found');
  }
});

module.exports = {
  getMyProfile,
};