const { Message } = require('../data/models/messageSchema');
const { Conversation } = require('../data/models/conversationSchema');
const mongoose = require('mongoose');

const getChats = async (req, res) => {
    await Message.find()
        .populate("sender")
        .exec((err, chats) => {
            console.log(chats)
            if(err) return res.status(400).send(err);
            res.status(200).send(chats)
        })
};

const getAllMessages = async (req, res) => {
    await Message.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'senderObj',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'recipient',
                foreignField: '_id',
                as: 'recieptObj',
            },
        },
    ])

    .exec((err, chats) => {
        console.log(chats)
        if(err) return res.status(400).send(err);
        res.status(200).send(chats)
    }) 
}

const postMessage = (req, res) => {
    const message = new Message(req.body);

    message.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
}


module.exports = { getChats, postMessage, getAllMessages }