const express = require('express');
const router = express.Router();
const { getMyProfile } = require('../controllers/patientController');
const { protect } = require('../middlewares/authMiddlewares');

console.log('Is protect a function?', typeof protect === 'function');
console.log('Is getMyProfile a function?', typeof getMyProfile === 'function');

router.get('/me', protect, getMyProfile);

module.exports = router;