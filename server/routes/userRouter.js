const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const userControl = require('../controllers/userController');

router.get('/auth', auth, userControl.authUser);
router.post('/register', userControl.registerUser);
router.post('/login', userControl.logInUser);
router.post('/logout', auth, userControl.logOutUser);

module.exports = router;