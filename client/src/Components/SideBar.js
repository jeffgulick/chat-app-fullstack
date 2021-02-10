import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, AppBar, Toolbar, IconButton, List, Typography, Divider } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: "#18191A",
  },
  toolBar: {
    paddingLeft: '15pt',
    width: '100%',
  },
  chatListContainer: {
    backgroundColor: "#18191A",
    paddingLeft:'5pt',
    height: "100%",
  },
  chatList: {
    marginLeft:'5pt',
    paddingLeft:'5pt',
  },
  title: {
    marginLeft: "17pt",
  },
  addIcon: {
    fontSize: "20pt",
    textAlign: "end",
    color: "white",
  },
  inline: {
    display: 'inline',
  },
}));

const SideBar = () => {
  const classes = useStyles();
  return (
    <div style={{width:"350px", height:'auto'}}>
      <AppBar className={classes.bar} position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="user">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <h4 className={classes.title}>Chats</h4>
          <IconButton edge='end' style={{marginLeft:'75pt', paddingRight:'5pt', paddingLeft:'20pt'}}>
            <AddBoxIcon className={classes.addIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.chatListContainer}>
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
      </div>
    </div>
  )
}
 
export default SideBar;