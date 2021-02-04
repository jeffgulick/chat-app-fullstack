import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 500px;
//   max-height: 500px;
//   overflow: auto;
//   width: 400px;
//   border: 1px solid lightgray;
//   border-radius: 10px;
//   padding-bottom: 10px;
//   margin-top: 25px;
// `;

// const TextArea = styled.textarea`
//   width: 98%;
//   height: 100px;
//   border-radius: 10px;
//   margin-top: 10px;
//   padding-left: 10px;
//   padding-top: 10px;
//   font-size: 17px;
//   background-color: transparent;
//   border: 1px solid lightgray;
//   outline: none;
//   color: lightgray;
//   letter-spacing: 1px;
//   line-height: 20px;
//   ::placeholder {
//     color: lightgray;
//   }
// `;

// const Button = styled.button`
//   background-color: pink;
//   width: 100%;
//   border: none;
//   height: 50px;
//   border-radius: 10px;
//   color: #46516e;
//   font-size: 17px;
// `;

// const Form = styled.form`
//   width: 400px;
// `;

// const MyRow = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 10px;
// `;

// const MyMessage = styled.div`
//   width: 45%;
//   background-color: pink;
//   color: #46516e;
//   padding: 10px;
//   margin-right: 5px;
//   text-align: center;
//   border-top-right-radius: 10%;
//   border-bottom-right-radius: 10%;
// `;

// const PartnerRow = styled(MyRow)`
//   justify-content: flex-start;
// `;

// const PartnerMessage = styled.div`
//   width: 45%;
//   background-color: transparent;
//   color: lightgray;
//   border: 1px solid lightgray;
//   padding: 10px;
//   margin-left: 5px;
//   text-align: center;
//   border-top-left-radius: 10%;
//   border-bottom-left-radius: 10%;
// `;
/////////////////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: "#242526",
  },
  page: {
    margin:0,
    width: '100%',
    height: '80vh'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  messageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#242526'
  },
  title: {
    flexGrow: 1,
  },
}));

const Chat = () => {
  const classes = useStyles();

  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');

    socketRef.current.on("your id", id => {
      setYourID(id);
    })

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
      console.log(message)
    })
  },[]);

  const receivedMessage = (message) => {
      setMessages(item => [...item, message])
  }
  console.log(messages)

  const sendMessage = (e) => {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
    console.log(messageObject)
  }
  
  const handleChange = (e) => {
      setMessage(e.target.value)
  }
  
  return (
    <div className={classes.page}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
        </Toolbar>
      </AppBar>
      <div className={classes.messageContainer}></div>

        {/* <Container>
          {messages.map((message, index) => {
            if (message.id === yourID) {
              return (
                <MyRow key={index}>
                  <MyMessage>
                    {message.body}
                  </MyMessage>
                </MyRow>
              )
            }
            return (
              <PartnerRow key={index}>
                <PartnerMessage>
                  {message.body}
                </PartnerMessage>
              </PartnerRow>
            )
          })}
        </Container>
        <Form onSubmit={sendMessage}>
          <TextArea value={message} onChange={handleChange} placeholder="Say something..." />
          <Button>Send</Button>
        </Form> */}
    </div>
  );
};

export default Chat;