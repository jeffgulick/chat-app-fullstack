const path = require('path');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Message } = require("./data/models/messageSchema"); 
const cors = require("cors");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const config = require("./data/database");


const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/userRouter"));
app.use("/api/messages", require("./routes/messagesRouter"));

app.use(cors());

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


  app.use(express.static("app/client/build"));
  app.enable("trust proxy");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });


const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
