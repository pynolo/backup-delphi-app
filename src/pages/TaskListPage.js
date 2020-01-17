import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DelphiTaskList from "../comp/task/DelphiTaskList";
import DelphiNavBar from "../comp/DelphiNavBar";

function TaskListPage() {
  return (
    <div>
      <DelphiNavBar />
      <p></p>
      <Container>
        <Row>
          <Col md={1}>&nbsp;</Col>
          <Col md='auto'>
            <DelphiTaskList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TaskListPage;
