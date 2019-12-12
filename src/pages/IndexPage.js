import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Login from "../components/Login";

function IndexPage() {
  return (
    <Container>
      <Row>
        <Col lg={4}>&nbsp;</Col>
        <Col lg={4}>
          <Login />
        </Col>
        <Col lg={4}>&nbsp;</Col>
      </Row>
    </Container>
  );
}

export default IndexPage;
