const express = require('express');

const router = express.Router();

const { generateCertificate } = require('../controllers/generatCertificat')

// Route to generate a certificate
// routes/certificate.routes.js
router.post('/generate', generateCertificate);


module.exports = router;