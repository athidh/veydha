const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const consultationSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    doctor: {
        type: String,
        required: [true, 'Doctor name is required.'],
        trim: true,
    },
    diagnosis: {
        type: String,
        required: [true, 'Diagnosis is required.'],
        trim: true,
    },
    medications: {
        type: [String],
        required: true,
    }
});

// MAIN PATIENT SCHEMA
const patientSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: [true, 'Patient ID is required.'],
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: [true, 'Patient name is required.'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false,
    },
    age: {
        type: Number,
        required: [true, 'Age is required.']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Gender is required.']
    },
    consultationHistory: [consultationSchema]
}, {
    timestamps: true
});

// compare password with hashed pass
patientSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// last date 
patientSchema.virtual('lastVisitDate').get(function() {
    return this.updatedAt;
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;