import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import LoginForm from "../components/LoginForm";
import DelphiNavBar from "../components/DelphiNavBar";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <DelphiNavBar />
        <Container>
          <Row>
            <Col lg={4}>&nbsp;</Col>
            <Col lg={4}>
              <LoginForm />
            </Col>
            <Col lg={4}>&nbsp;</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginPage;
