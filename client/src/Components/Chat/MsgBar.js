import { AppBar, Toolbar, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bar: {
      backgroundColor: "#242526",
    },
  }));

const MsgBar = (props) => {
    const classes = useStyles();
    return (
        <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <h5 style={{marginLeft:'15pt'}}>{props.recipient}</h5> 
        </Toolbar>
      </AppBar>
    );
}
export default MsgBar;