import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">ChatTime</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/Chat">Chat</Nav.Link>
    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form> */}
  </Navbar>
    );
}
 
export default Navigation
