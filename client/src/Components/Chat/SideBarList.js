import React, { useState, useEffect } from 'react';
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
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
      props.getConversations(props.user.userId)
      let object = props.conversations

      console.log(object)
      // for(let item in test){
      //   for(let i=0;i < te; i++){
      //     console.log(item[i])
      //   }
      // }
  
    },[])

    return (

        <List className={classes.chatList}>
          {
            Object.keys(props.conversations).map((key, index) => {
              return(<ListItem style={{color:'white'}}>{key}</ListItem>)
            })
          }
          {/* <ListItem alignItems="flex-start" style={{color:'white', paddingRight:'0'}}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary=""
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
              primary=""
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
          <Divider variant="inset" component="li"  /> */}
        </List>
    );
}
 
export default SideBarList;