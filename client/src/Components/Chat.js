import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";

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
    width: '100%',
    height: '100%',
    backgroundColor: '#242526'
  },
  messageContent: {
    flexGrow: 1,
    width:'100%',
    height:'89%',
    marginBottom:0,
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
          <p>hello can you see me</p>
          <p>hello can you see me</p>
          <p>hello can you see me</p>
          <p>hello can you see me</p>
          <p>hello can you see me</p>
          <p>hello can you see me</p>
      
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