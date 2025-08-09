const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const consultationSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    diagnosis: {
        type: String,
        required: [true, 'Diagnosis is required.'],
        trim: true,
    },
    medications: {
        type: [String], // Defines an array of strings
        required: true,
    }
});
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
        select: false, // Prevents password from being sent to the api 
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    lastVisitDate: {
        type: Date,
    },
    consultationHistory: [consultationSchema] 
});

patientSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

patientSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;