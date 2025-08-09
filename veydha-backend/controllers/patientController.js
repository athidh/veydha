const Patient = require('../models/patientModel');

// get profile logic 
const getMyProfile = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);

    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

module.exports = {
    getMyProfile,
};