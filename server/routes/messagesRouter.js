const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const messageControl = require('../controllers/messageControl');

router.post('/postmessage',auth, messageControl.postMessage);
router.get('/conversations/query',auth, messageControl.converstationsByUsers);
router.post('/conversations',auth, messageControl.conversationByOneUser) 

module.exports = router; 