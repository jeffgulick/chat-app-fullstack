const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
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

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message }