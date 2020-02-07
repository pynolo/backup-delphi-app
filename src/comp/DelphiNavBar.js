import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import appConstants from "../etc/appConstants";
import version from "../etc/version";

import {
  getUsername,
  removeUsername,
  getRole,
  removeRole
} from "./LoginCookie";
import logo from "../img/pythia.png";

class DelphiNavBar extends React.Component {
  constructor(props) {
    super(props);

    let usernameObj = getUsername();
    let roleObj = getRole();
    let username = null;
    if (usernameObj != null) username = usernameObj.username;
    let role = null;
    if (roleObj != null) role = roleObj.role;
    this.state = {
      username: username,
      role: role
    };
  }

  logout() {
    removeUsername();
    removeRole();
  }

  render() {
    let menuItems = null;
    let contentEnd = null;
    if (this.state.username === null) {
      menuItems = (
        <Nav className='mr-auto'>
          <Nav.Link href='/#' className='text-light'>
            Sistema semplificato di esecuzione task
          </Nav.Link>
        </Nav>
      );
      contentEnd = "v." + version.version + " " + appConstants.install;
    } else {
      if (this.state.role === "admin") {
        menuItems = (
          <Nav className='mr-auto'>
            <Nav.Link href='/tasklist'>Elenco task</Nav.Link>
            <Nav.Link href='/matchlist'>Visualizzazione</Nav.Link>
            <Nav.Link href='/userlist'>Utenti</Nav.Link>
            <Nav.Link href='/manuale-delphi.pdf'>Manuale</Nav.Link>
            <Nav.Link href='/#' onClick={this.logout}>
              Logout
            </Nav.Link>
          </Nav>
        );
        contentEnd = this.state.username;
      } else {
        menuItems = (
          <Nav className='mr-auto'>
            <Nav.Link href='/tasklist'>Elenco task</Nav.Link>
            <Nav.Link href='/manuale-delphi.pdf'>Manuale</Nav.Link>
            <Nav.Link href='/#' onClick={this.logout}>
              Logout
            </Nav.Link>
          </Nav>
        );
        contentEnd = this.state.username;
      }
    }
    return (
      <Navbar bg='primary' variant='dark' expand='sm'>
        <Navbar.Brand href='#'>
          <img
            src={logo}
            width='50'
            height='50'
            className='d-inline-block align-top'
            alt='Giunti Delphi'
          />
        </Navbar.Brand>
        <Navbar.Brand href='#'>Delphi</Navbar.Brand>
        {menuItems}
        <Navbar.Collapse className='justify-content-end'>
          {contentEnd}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default DelphiNavBar;
