const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    recipient: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Message' }],

    sender: [{ 
        type: Schema.Types.ObjectId, 
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
