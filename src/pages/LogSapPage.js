import React from "react";
import Moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import LogSapMasterTable from "../comp/logsap/LogSapMasterTable";
import DelphiNavBar from "../comp/DelphiNavBar";

//import appConstants from "../etc/appConstants";

class LogSapPage extends React.Component {
  constructor(props) {
    super(props);
    var yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 24);
    var now = new Date();

    this.state = {
      startString: Moment(yesterday).format("MM/DD/YYYY HH:mm"),
      finishString: Moment(now).format("MM/DD/YYYY HH:mm")
    };

    this.changeStart = this.changeStart.bind(this);
    this.changeFinish = this.changeFinish.bind(this);
    this.createToolbar = this.createToolbar.bind(this);
  }

  changeStart(event) {
    this.setState({
      startString: event.target.value
    });
    console.log("changestart");
  }

  changeFinish(event) {
    this.setState({
      finishString: event.target.value
    });
    console.log("changefinish");
  }

  createToolbar() {
    var start = this.state.startString;
    var finish = this.state.finishString;
    return (
      <Container>
        <Row>
          <Col md={1}>
            <Form.Label>Inizio:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              type='text'
              name='startTime'
              value={start}
              size='md'
              onChange={this.changeStart}
            />
          </Col>
          <Col md={1}>
            <Form.Label>Fine:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              type='text'
              name='finishTime'
              value={finish}
              size='md'
              onChange={this.changeFinish}
            />
          </Col>
          <Col md={2}>
            <Button>Filtra</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    var toolbar = this.createToolbar();
    return (
      <div>
        <DelphiNavBar />
        <p></p>
        <Container>
          <Row>
            <Col md={1}>&nbsp;</Col>
            <Col md='auto'>
              {toolbar}
              <LogSapMasterTable
                startDatetime={this.state.startDatetime}
                finishDatetime={this.state.finishDatetime}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LogSapPage;
