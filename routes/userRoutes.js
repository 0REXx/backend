const express = require('express');
const registerUser = require('../app/endpoints/registerUser');
const loginUser = require('../app/endpoints/loginUser');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;