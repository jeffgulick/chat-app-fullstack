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
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  let userId = props.user.userId;

  useEffect(() => {
    props.getConversations(userId);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSelection = (info) => {
    props.getMessages(info);
    props.toggleSideBar();
    props.getContacts()

    setTimeout(() => {
      let test = props.contacts.find(item => info.conversationName == item.username)
      props.getRecipient(test)
    }, 1100);
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
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
