const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const messageControl = require('../controllers/messageControl');

router.get('/getMessages', messageControl.getMessage);
router.post('/postmessage', messageControl.postMessage);
router.get('/allmessages', messageControl.getAllMessages);
module.exports = router;