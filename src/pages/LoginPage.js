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
            <Col xl={3}>&nbsp;</Col>
            <Col xl={6}>
              <LoginForm />
            </Col>
            <Col xl={3}>&nbsp;</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginPage;
