import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

const Navigation = (props) => {
  let login = props.loggedIn;

  const logOut = () => {
    axios.post('/api/users/logout', {
     
    })
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
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">ChatTime</Navbar.Brand>
        {!login ?
        <Nav className="justify-content-end">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav> :''}
        
      {login ? 
        <Nav className ="justify-content-end">
          <Button onClick={logOut} variant="secondary" className = "justify-content-end">Log Out</Button>
        </Nav> : ''}
    </Navbar>
    );
}
 
export default Navigation
