require('dotenv').config();
const path = require('path');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Message } = require("./data/models/messageSchema"); 

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const db = require("./config/production").mongoURI;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/userRouter"));
app.use("/api/messages", require("./routes/messagesRouter"));

const mongoose = require("mongoose");
const connect = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

io.on("connection", socket => {
  socket.on("Input Chat Message", (msg) => {

    connect.then((db) => {
      try {
        let chat = new Message({
          message: msg.chatMessage,
          sender: msg.senderId,
          recipient: msg.recipientId,
          username: msg.username,
        });

        chat.save((err, doc) => {
          if (err) return res.json({ success: false, err });

          Message.find({ _id: doc._id })
            .populate("sender")
            .exec((err, doc) => {
              return io.emit("Output Chat Message", doc);
            });
        });
      } catch (error) {
        console.error(error);
      }
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+ '/client/build/index.html'))
})
app.enable("trust proxy");
app.use(express.static("client/build"));

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server Listening on ${port}`);
})