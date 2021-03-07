import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, List, Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
}));

const SideBarList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getConversations(props.user.userId);
  }, []);

  return (
    <List className={classes.chatList}>
      {props.conversations.map((item, index) => (
        <div key={index}>
          <ListItem
            alignItems="flex-start"
            style={{ color: "white", paddingRight: "0" }}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={item.conversationName}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="Primary"
                  >
                    {item.message}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
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
};

export default SideBarList;
