const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { Message } = require("./data/models/messageSchema");


const config = require("./data/database");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected Homie...'))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/userRouter'));
app.use('/api/messages', require('./routes/messagesRouter'));
// app.use('/api/conversation', require('./routes/conversationRouter'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

io.on("connection", socket => {

  socket.on("Input Chat Message", msg => {

    connect.then(db => {
      try {
          let chat = new Message({ message: msg.chatMessage, sender:msg.userId, type: msg.type })

          chat.save((err, doc) => {
            console.log(doc)
            if(err) return res.json({ success: false, err })

            Message.find({ "_id": doc._id })
            .populate("sender")
            .exec((err, doc)=> {

                return io.emit("Output Chat Message", doc);
            })
          })
      } catch (error) {
        console.error(error);
      }
    }) 
   })

})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});
