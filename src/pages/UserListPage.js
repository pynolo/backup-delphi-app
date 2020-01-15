import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DelphiUserList from "../comp/DelphiUserList";
import DelphiNavBar from "../comp/DelphiNavBar";

import appConstants from "../etc/appConstants";

function UserListPage() {
  return (
    <div>
      <DelphiNavBar />
      <Container>
        <Row>
          <Col md={1}>&nbsp;</Col>
          <Col md='auto'>
            <DelphiUserList constants={appConstants} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserListPage;
