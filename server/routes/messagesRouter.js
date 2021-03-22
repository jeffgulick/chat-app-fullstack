const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const messageControl = require('../controllers/messageControl');

router.post('/createconversation', auth, messageControl.createConversationDoc);
router.get('/conversations/query',auth, messageControl.converstationsByUsers);
router.post('/conversationInfo', messageControl.conversationInfo);
router.post('/conversations', messageControl.conversationList); 
router.post('/chats',  messageControl.chatMessagesByConversation);

module.exports = router; 