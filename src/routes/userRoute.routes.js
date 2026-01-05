const express = require('express');

const router = express.Router();

const { createUser, loginUser } = require('../controllers/user.controller');

// Route to create a new user
router.post('/users', createUser);
router.post('/users/login', loginUser);


module.exports = router;