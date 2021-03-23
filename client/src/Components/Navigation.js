import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Paper, Avatar } from '@material-ui/core';
import logo from '../images/logo.jpg';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'white',
  },
  link: {
    textDecoration: 'none',
    color: '#46516E'
  },
  status: {
    backgroundColor: '#D3D3D3',
    paddingLeft:'15pt'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Navigation = (props) => {
  const classes = useStyles();
  let logIn = props.loggedIn;

  const logOut = () => {
    axios.get('/api/users/logout')
    .then(function (response) {
      if(response.data.success){
        document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        props.signOut();
      }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className={classes.root}>
          <Paper>
            <AppBar className={classes.appBar} position='static' >
              <Toolbar>
              <Avatar alt="Remy Sharp" src={logo} className={classes.large} />
                <Typography style={{color:"black"}} variant="h5" className={classes.title}>
                  TOX
                </Typography>
                {logIn ?
                  <div>
                    <Button color="inherit"><Link className={classes.link} to="/">Home</Link></Button>
                    <Button color="inherit"><Link className={classes.link} to="/message">Chat</Link></Button>
                    <Button onClick={logOut} color="inherit"><Link className={classes.link} to="/">LOG OUT</Link></Button>
                  </div>
                  :
                  <div>
                    <Button color="inherit"><Link className={classes.link} to="/">Home</Link></Button>
                    <Button color="inherit"><Link className={classes.link} to="/register">Sign Up</Link></Button>
                    <Button color="inherit"><Link className={classes.link} to="/login">Login</Link></Button>
                  </div>}
              </Toolbar>
            </AppBar>
            {/* {logIn ? <div className={classes.status}>Logged in as: {props.getUserName.username}</div> : ''} */}
          </Paper>
    </div>
);
}
 
export default Navigation
