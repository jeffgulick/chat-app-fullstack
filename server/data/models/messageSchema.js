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
    sender: {
        type: Schema.Types.ObjectId,
       ref: 'User'
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: String,
        default: Date.now,
    },
}, {timestamps: true});

const Message = mongoose.model('messages', messageSchema);

module.exports = { Message }