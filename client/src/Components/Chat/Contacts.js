import React, { useState, useEffect } from "react";
import axios from "axios";
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  CircularProgress,
} from "@material-ui/core";

const Contacts = (props) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/users/contacts")
      .then((data) => {
        let usernames = data.data;
        usernames.forEach((element) => {
          setContacts((contacts) => [...contacts, element]);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectPerson = (user) => {
    let id = nanoid(10);
    props.getRecipient(user);
    props.getConversationId(id)
    props.closeModal();
  };

  return (
    <div>
      {loading ? (
        <CircularProgress style={{ marginLeft: "100pt" }} />
      ) : (
        <div>
          {contacts.map((name, index) => (
            <div key={index + 1}>
              <ListItem onClick={() => selectPerson(name)}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                {name.username}
              </ListItem>
              <Divider />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Contacts;
