import React, { useEffect } from 'react';
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, List, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chatList: {
      marginLeft:'5pt',
      paddingLeft:'5pt',
    },
    inline: {
      display: 'inline',
    },
  }));
  
const SideBarList = (props) => {
    const classes = useStyles();
    let conversations = [];
    let groupedConversations = {};

    useEffect(() => {
        axios.post('/api/messages/conversations', {senderId: props.user.userId})
            .then(data => {
              let temp = data.data
               
              //parsing data to work with
              conversations = temp.map((item, index) => {
                let msgObj = {conversationName:'', message:'', sender:''}
                if(item.sender === props.user.userId){
                  msgObj.conversationName = item.userRecieved[0].username;
                  msgObj.message = item.message;
                  msgObj.sender = item.userSent[0].username;
                } 
                else {
                  msgObj.conversationName = item.userSent[0].username;
                  msgObj.message = item.message;
                  msgObj.sender = item.userSent[0].username;
                }
                return msgObj
              })

              //this groups messages by conversation. uses reducer()
              const groupBy = (objectArray, property) => {
                return objectArray.reduce((acc, obj) => {
                  let key = obj[property]
                  if (!acc[key]) {
                    acc[key] = []
                  }
                  acc[key].push(obj)
                  return acc
                }, {})
              }
              groupedConversations = groupBy(conversations, 'conversationName')
              console.log('grouped: ',groupedConversations)
            })                      
    },[])

    return (
        <List className={classes.chatList}>
          <ListItem alignItems="flex-start" style={{color:'white', paddingRight:'0'}}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Ali Conners"
              secondary={
                <React.Fragment>
                  <Typography 
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="Primary"
                  >
                    Brunch this weekend? Let me know. what do you know what do you know
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li"  />
          <ListItem alignItems="flex-start" style={{color:'white'}}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Ali Conners"
              secondary={
                <React.Fragment>
                  <Typography 
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="Primary"
                  >
                    Brunch this weekend?
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li"  />
        </List>
    );
}
 
export default SideBarList;