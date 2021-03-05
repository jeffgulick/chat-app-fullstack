import React, { useState, useEffect } from "react";
import MsgBar from '../../Containers/MsgBar';
import styled from "styled-components";
import useSocket from 'use-socket.io-client';
import { makeStyles } from '@material-ui/core/styles';

const InputArea = styled.input`
  width: 80%;
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
const BubbleMe = styled.p`
  display: inline-block;
  position: relative;
  align-items: flex-end;
  text-align: center;
  font-size: 12pt;
  max-width: 85vh;
  height: auto;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-top: 5pt;
  padding-bottom: 5pt;
  margin: 10pt;
  border: 2pt solid #2D88FF;
  border-radius: 25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  color: #242526;
  background-color: #2D88FF;
  align-self: flex-end;
`;

const BubbleYou = styled.p`
  display: inline-block;
  position: relative;
  align-items: flex-start;
  text-align: center;
  font-size: 12pt;
  max-width: 85vh;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-top: 5pt;
  padding-bottom: 5pt;
  margin: 10pt;
  border: 2pt solid #3A3B3C;
  border-radius: 25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  color: white;
  background-color: #3A3B3C;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    width:'auto',
    height:'89%',
    marginBottom:0,
    marginRight:'15pt',
    marginLeft:'15pt',
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
  const [socket] = useSocket('http://localhost:3001');
  socket.connect();

  let user = props.user;

  let results;
  useEffect(() => {
    socket.on("Output Chat Message",  (data) => {
      results = data[0]
      setMessages(messages => [...messages, results])

    });
    console.log(user)
    return () => {
      socket.removeListener("Output Chat Message")
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    let chatMessage = input
    let senderId = props.user.userId;
    let recipientId = props.recipient._id;
    let username = props.user.username;

    socket.emit('Input Chat Message',  {
      chatMessage,
      senderId,
      recipientId,
      username,
    })
    console.log(messages.message)
    setInput('')  
  }
  return (
    <div className={classes.page}>
      <MsgBar />
      <div className={classes.messageContainer}>
        <div className={classes.messageContent}>
          {messages.map((item, index)=>(
            <div className={`${item.username == user.username ? 'align-self-end' : 'align-self-start'}`} key={index}>
              {item.username == user.username ? 
                <BubbleMe>{item.message}</BubbleMe> : 
                <div>
                  <p style={{marginLeft:'12pt', marginBottom:'0'}}>{props.recipient.username}</p>
                  <BubbleYou>{item.message}</BubbleYou>
                </div> }
            </div>
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