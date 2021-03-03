const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const messageControl = require('../controllers/messageControl');

router.get('/getChats', messageControl.getChats)
router.post('/postmessage', messageControl.postMessage);
router.get('/allmessages', messageControl.getAllMessages);
router.get('/conversations/query', messageControl.converstationsByUsers);
router.post('/conversations', messageControl.conversationByOneUser) 

// router.get('/conversations', messageControl.getConversations);
module.exports = router;