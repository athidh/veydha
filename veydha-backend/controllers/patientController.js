const Patient = require('../models/patientModel');
const getMyProfile = async (req, res) => {
    try {
        
        const patient = await Patient.findById(req.user.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const patientProfile = {
            _id: patient._id,
            patientId: patient.patientId,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            consultationHistory: patient.consultationHistory, 
            createdAt: patient.createdAt,
            updatedAt: patient.updatedAt
        };
        res.status(200).json(patientProfile);

    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

module.exports = {
    getMyProfile,
};