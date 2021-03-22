const { Message } = require("../data/models/messageSchema");
const { Conversation } = require("../data/models/conversationSchema");
const mongoose = require("mongoose");


//creates conversation ids based on sender and recipient
//checks for an existing conversation in database and either creates a new conversation or passes existing id to client
const createConversationDoc = (req, res) => {
  Conversation.findOne(
    { $or: 
      [
        {$and: [{sender: req.body.senderId}, {recipient: req.body.recipientId}]},
        {$and: [{sender: req.body.recipientId}, {recipient: req.body.senderId}]}
      ]
    }, 
    (err, conv)=> {
      if (err){
        return res.json({success: false, err});
      }
      if(conv){
        console.log('*****I match')
        //returning existing id to client
        res.status(200).json({message:'existing conversation', conversationId: conv._id})
      }
      else {
        console.log('*********i do not match')
        //creates new conversation document
        const conversation = new Conversation({
          sender: req.body.senderId,
          recipient: req.body.recipientId
        })
        conversation.save((err, user) => {
          if (err){
            return res.json({success: false, err});
          }
          res.status(200).json({message: 'new conversation', conversationId: user._id})
        })
    }
 })
}
//creates a list of conversations for the currently logged in user. changes depending on who is logged in
const conversationList = async (req, res) => {
  let user = mongoose.Types.ObjectId(req.body.senderId);

  await Message.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "userSent",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "recipient",
        foreignField: "_id",
        as: "userRecieved",
      },
    },
  ])
    .match({
      $or: [{ sender: user }, { recipient: user }],
    })
    .project({
      "userSent._v": 0,
      "userRecieved._v": 0,
      "userSent.date": 0,
      "userRecieved.date": 0,
      "userSent.password": 0,
      "userRecieved.password":0,
    })
    .exec((err, messages) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        //parsing data to work with later
        let conversations = messages.map((item) => {
          let msgObj = { conversationName: "", message: "", sender: "" }; 
          if (item.userSent[0]._id == req.body.senderId) {
            msgObj.conversationName = item.userRecieved[0].username;
            msgObj.message = item.message;
            msgObj.sender = item.userSent[0].username;
          } else {
            msgObj.conversationName = item.userSent[0].username;
            msgObj.message = item.message;
            msgObj.sender = item.userSent[0].username;
          }
          return msgObj;
        });
        //this groups messages by conversation. uses reducer()
        const groupBy = (objectArray, property) => {
          return objectArray.reduce((acc, obj) => {
            let key = obj[property];
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
        };
        groupedConversations = groupBy(conversations, "conversationName");
//pulls the last message from the messages array
        let lastMessage = [];
        const entries = Object.values(groupedConversations);
        entries.forEach((item) => {
          for (let i = 0; i < 1; i++) {
            let temp = item[item.length - 1];
            lastMessage = [...lastMessage, temp];
          }
        });
        res.send(lastMessage);
      }
    });
};

//gets messages depending on which conversation is currently active
const chatMessagesByConversation = async (req, res) => {
  let user = mongoose.Types.ObjectId(req.body.senderId);
  let user2 = req.body.conversationName;

  await Message.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "userSent",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "recipient",
        foreignField: "_id",
        as: "userRecieved",
      },
    },
  ])
    .match({
      $or: [{ sender: user }, { recipient: user }],
    })
    .project({
      "userSent._v": 0,
      "userRecieved._v": 0,
      "userSent.date": 0,
      "userRecieved.date": 0,
      "userSent.password": 0,
      "userRecieved.password":0,

    })
    .exec((err, messages) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        let temp = messages;
        //parsing data to work with later
        let conversations = temp.map((item) => {
          let msgObj = { conversationName: "", message: "", sender: "" };
          if (item.userSent[0]._id == req.body.senderId) {
            msgObj.conversationName = item.userRecieved[0].username;
            msgObj.message = item.message;
            msgObj.sender = item.userSent[0].username;
          } else {
            msgObj.conversationName = item.userSent[0].username;
            msgObj.message = item.message;
            msgObj.sender = item.userSent[0].username;
          }
          return msgObj;
        });

        let listOfMessages = conversations.filter(item => item.conversationName == user2
        );
        res.send(listOfMessages);
      }
    });
};

// Get messages based on to & from
const converstationsByUsers = async (req, res) => {
  let user1 = mongoose.Types.ObjectId(req.body.senderId);
  let user2 = mongoose.Types.ObjectId(req.body.recipientId);
  await Message.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "recipient",
        foreignField: "_id",
        as: "toObj",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "fromObj",
      },
    },
  ])
    .match({
      $or: [
        { $and: [{ recipient: user1 }, { sender: user2 }] },
        { $and: [{ recipient: user2 }, { sender: user1 }] },
      ],
    })

    .project({
      "toObj.__v": 0,
      "toObj.date": 0,
      "fromObj.__v": 0,
      "fromObj.date": 0,
    })
    .exec((err, messages) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        res.send(messages);
      }
    });
};

module.exports = {
  createConversationDoc,
  converstationsByUsers,
  conversationList,
  chatMessagesByConversation,
};
