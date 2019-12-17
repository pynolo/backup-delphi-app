import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getUsername, removeUsername } from "./LoginCookie";
import logo from "../img/pythia.png";

class DelphiNavBar extends React.Component {
  constructor(props) {
    super(props);

    let usernameObj = getUsername();
    let username = null;
    if (usernameObj != null) username = usernameObj.username;
    this.state = {
      username: username
    };
  }

  logout() {
    removeUsername();
  }

  render() {
    let menuItems = null;
    if (this.state.username === null) {
      menuItems = (
        <Nav className='mr-auto'>
          <Nav.Link href='/login'>Login</Nav.Link>
        </Nav>
      );
    } else {
      menuItems = (
        <Nav className='mr-auto'>
          <Nav.Link href='/tasklist'>Elenco task</Nav.Link>

          <Nav.Link href='/#' onClick={this.logout}>
            Logout {this.state.username}
          </Nav.Link>
        </Nav>
      ); /*<Nav.Link href='/filters'>Filtri</Nav.Link>
          <Nav.Link href='/users'>Utenti</Nav.Link>*/
    }
    return (
      <Navbar bg='primary' variant='dark' expand='sm'>
        <Navbar.Brand href='/'>
          <img
            src={logo}
            width='50'
            height='50'
            className='d-inline-block align-top'
            alt='Giunti Delphi'
          />
        </Navbar.Brand>
        <Navbar.Brand href='/'>Delphi</Navbar.Brand>
        {menuItems}
      </Navbar>
    );
  }
}

export default DelphiNavBar;
