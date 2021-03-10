const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    conversationId: [{ 
        type: Schema.Types.conversationId, 
        ref: 'Message' }],

    
    // lastMessage: {
    //     type: String,
    // },
    // date: {
    //     type: String,
    //     default: Date.now,
    // },
});

const Conversation = mongoose.model('conversations', ConversationSchema);

module.exports = { Conversation }
