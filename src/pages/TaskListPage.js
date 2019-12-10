import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DelphiTaskList from "../components/DelphiTaskList";

import appConstants from "../etc/appConstants";

function TaskListPage() {
  return (
    <Container>
      <Row>
        <Col sm={1}>&nbsp;</Col>
        <Col md='auto'>
          <DelphiTaskList constants={appConstants} />
        </Col>
      </Row>
    </Container>
  );
}

export default TaskListPage;
