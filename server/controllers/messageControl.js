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

const conversationByOneUser = (req, res) => {
    let user = mongoose.Types.ObjectId(req.body.senderId);

    Message.aggregate([
        {
            $lookup: {
                from: 'users',
                localField:'sender',
                foreignField:'_id',
                as: 'userSent',
            },
        },
        {
            $lookup: {
                from:'users',
                localField:'recipient',
                foreignField:'_id',
                as:'userRecieved'
            }
        }
        
    ])
    .match({
        $or: [
            {sender: user}, {recipient: user}
        ]
    })
    .project({
        // 'userObj.password': 0,
        'userObj.__v': 0,
        'userObj.date': 0,
    })
    .exec((err, messages) => {
        if (err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            // res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
        } else {
            res.send(messages);
        }
    });
}

// Get messages based on to & from
const converstationsByUsers = async (req, res) => {
    let user1 = mongoose.Types.ObjectId(req.body.senderId);
    let user2 = mongoose.Types.ObjectId(req.body.recipientId);
   await Message.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'recipient',
                foreignField: '_id',
                as: 'toObj',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'fromObj',
            },
        },
    ])
        // .match({
        //     $or: [
        //         { $and: [{ recipient: user1 }, { sender: user2 }] },
        //         { $and: [{ recipient: user2 }, { sender: user1 }] },
        //     ],
        // })
        .match({
            $or: [
                {sender: user1}, {recipient: user1}
            ]
        })
    
        .project({
            'toObj.password': 0,
            'toObj.__v': 0,
            'toObj.date': 0,
            'fromObj.password': 0,
            'fromObj.__v': 0,
            'fromObj.date': 0,
        })
        .exec((err, messages) => {
            if (err) {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Failure' }));
                res.sendStatus(500);
            } else {
                res.send(messages);
            }
        });
};


module.exports = { getChats, postMessage, getAllMessages, converstationsByUsers, conversationByOneUser }