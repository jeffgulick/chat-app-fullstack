import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, List, Typography, Divider } from "@material-ui/core";
import logo from '../../images/logo.jpg';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
}));

const SideBarList = (props) => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  let userId = props.user.userId;

  useEffect(() => {
    props.getConversations(userId);
    props.getContacts()

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSelection = (info) => {
    let contacts = props.contacts
    props.getMessages(info);
    props.toggleSideBar();

    setTimeout(() => {
      let test = contacts.find(item => info.conversationName == item.username)
      props.getRecipient(test)
    }, 1500);
  };

  return (
    <List className={classes.chatList}>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {props.lastConversations.map((item, index) => (
            <div key={index}>
              <ListItem
                alignItems="flex-start"
                style={{ color: "white", paddingRight: "0" }}
              >
                <ListItemAvatar>
                  <Avatar alt= {item.username} src={logo} />
                </ListItemAvatar>
                <ListItemText
                  onClick={() =>
                    handleSelection({
                      senderId: props.user.userId,
                      conversationName: item.conversationName,
                      // recipientId: item.recipientId,
                    })
                  }
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
        </div>
      )}
    </List>
  );
};

export default SideBarList;
