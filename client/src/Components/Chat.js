import React, { useState, useEffect } from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";

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

const Chat = () => {
  const classes = useStyles();

  useEffect(() => {
    return () => {
      const socket = socketIOClient('http://localhost:3001');
      socket.on("Output Chat Message", (data) => console.log(data));  
      
    }
  },[])

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
          <p>hello can you see me 1</p>
          <p>hello can you see me 2</p>
          <p>hello can you see me 3</p>
          <p>hello can you see me 4</p>
          <p>hello can you see me 5</p>
          <p>hello can you see me 6</p>
      
        </div>
        <div className={classes.input}>
          <form style={{marginLeft:'15pt'}}>
            <InputArea />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;