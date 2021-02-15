import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useSocket from 'use-socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Avatar } from '@material-ui/core';

const InputArea = styled.input`
  width: 70%;
  height: 45px;
  border-radius: 30px;
  padding-left: 10px;
  font-size: 15px;
  background-color: #C1C1C1;
  border: 1px solid lightgray;
  outline: none;
  letter-spacing: 1px;
  line-height: 20px;  
`;

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
    height: '500px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  messageContainer: {
    width: 'auto',
    height: '100%',
    backgroundColor: '#242526'
  },
  messageContent: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    flexGrow: 1,
    width:'auto',
    height:'89%',
    marginBottom:0,
    marginRight:'20pt',
    color:'white',
    overflowY: 'auto'
  },
  input: {
    marginTop:0
  },
  title: {
    flexGrow: 1,
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState({})
  const [socket] = useSocket('http://localhost:3001');
  socket.connect();

  let user = props.user;

  let results;
  useEffect(() => {
    socket.on("Output Chat Message",  (data) => {
      results = data[0]
      console.log('socket on', results)
      setMessages(messages => [...messages, results])

    });
    return () => {
      socket.removeListener("Output Chat Message")
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    let chatMessage = input
    let senderId = props.user.userId
    let username = props.user.username;

    socket.emit('Input Chat Message',  {
      chatMessage,
      senderId,
      username
    })
    console.log(messages.message)
    setInput('')  
  }
  return (
    <div className={classes.page}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <h5 style={{marginLeft:'15pt'}}>Names in chat</h5> 
        </Toolbar>
      </AppBar>
      <div className={classes.messageContainer}>
        <div className={classes.messageContent}>
          {messages.map((item, index)=>(
            <p key={index}>{item.message}</p>
          ))}      
        </div>
        <div className={classes.input}>
          <form onSubmit={handleSubmit} style={{marginLeft:'15pt'}}>
            <InputArea
              type="text"
              value={input}
              onChange={(event)=> setInput(event.target.value)}
              onSubmit={handleSubmit}
              />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;