const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'conversations',
    },
    message: {
        type:String,
    },
    to: {
        type: Schema.Types.ObjectId,
       ref: 'User'
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
    },
    date: {
        type: String,
        default: Date.now,
    },
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message }