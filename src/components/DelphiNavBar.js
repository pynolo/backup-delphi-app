import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../img/pythia.png";

function DelphiNavBar() {
  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Navbar.Brand href='#home'>
        <img
          src={logo}
          width='50'
          height='50'
          className='d-inline-block align-top'
          alt='Giunti Delphi'
        />
      </Navbar.Brand>
      <Navbar.Brand href='/'>Delphi</Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='/tasklist'>Elenco task</Nav.Link>
        <Nav.Link href='/filters'>Filtri</Nav.Link>
        <Nav.Link href='/users'>Utenti</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default DelphiNavBar;
