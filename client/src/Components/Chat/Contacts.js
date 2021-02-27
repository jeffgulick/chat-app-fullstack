import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Divider, IconButton, DialogActions } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AddBoxIcon from '@material-ui/icons/AddBox';


const Contacts = (props) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('/api/users/contacts')
          .then(data => {
            let usernames = data.data;
            usernames.forEach(element => {
              setContacts(contacts => [...contacts, element])
            });
          })
          .catch(error => {
            console.log(error);
        })
        
      }, [])

    const selectPerson = (user) => {
        props.getRecipient(user);
        props.closeModal();
    }
    
    return (
        <div>
            {contacts.map((name, index) => (
                <div key={index +1}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        {name.username}
                        <DialogActions>
                            <IconButton onClick={()=> selectPerson(name)} edge='end' style={{marginLeft:'75pt', paddingRight:'5pt', paddingLeft:'20pt'}}>
                                <AddBoxIcon/>
                            </IconButton>
                        </DialogActions>
                    </ListItem>
                    <Divider />
                </div>
        ))}
        </div>
    );
}
export default Contacts;