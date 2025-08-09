const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
// --- PATHS UPDATED ---
const Patient = require('../models/patientModel'); 
const connectDB = require('../config/db');       

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Find .env in parent directory

// --- Main Function ---
const registerFromFile = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: File not found at ${filePath}`);
      process.exit(1);
    }

    // 1. Connect to the database
    await connectDB();

    // 2. Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileExtension = path.extname(filePath).toLowerCase();
    let patientsToRegister;

    if (fileExtension === '.json') {
      patientsToRegister = JSON.parse(fileContent);
    } else {
      // (CSV parsing logic would go here if needed)
      console.error('❌ Error: Unsupported file type for this script version.');
      process.exit(1);
    }
    
    console.log(`\n🔎 Found ${patientsToRegister.length} patient(s). Starting registration...`);
    let newPatientsCount = 0;
    let skippedCount = 0;

    // 3. Loop through each record
    for (const patientData of patientsToRegister) {
      const { patientId, name, password } = patientData;
      if (!patientId || !name || !password) {
        console.warn(`⚠️  Skipping invalid record: ${JSON.stringify(patientData)}`);
        skippedCount++;
        continue;
      }

      const patientExists = await Patient.findOne({ patientId });

      if (!patientExists) {
        // 4. If new, hash password and create patient
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);

        await Patient.create({
          ...patientData,
          password: hashedPassword
        });
        console.log(`✅ Registered new patient: ${name} (${patientId})`);
        newPatientsCount++;
      } else {
        // 5. If exists, skip
        console.log(`🟡 Skipping existing patient: ${name} (${patientId})`);
        skippedCount++;
      }
    }

    console.log(`\n✨ --- Process Complete --- ✨`);
    console.log(`   Successfully registered: ${newPatientsCount}`);
    console.log(`   Skipped (existing or invalid): ${skippedCount}`);
    process.exit();

  } catch (error) {
    console.error(`\n❌ An unexpected error occurred: ${error.message}`);
    process.exit(1);
  }
};

// --- Script Execution ---
const filePath = process.argv[2];
if (!filePath) {
  console.error('❌ Error: Please provide the path to the data file.');
  console.log('   Usage: node scripts/bulkRegister.js ./scripts/my_patientdata.json');
  process.exit(1);
}

registerFromFile(path.resolve(filePath));