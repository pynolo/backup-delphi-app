import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DelphiTaskTable from "../comp/task/DelphiTaskTable";
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
            <DelphiTaskTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TaskListPage;
