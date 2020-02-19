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
      startDtString: Moment(yesterday).format("MM/DD/YYYY HH:mm"),
      finishDtString: Moment(now).format("MM/DD/YYYY HH:mm"),
      startIsoDt: yesterday.toISOString(),
      finishIsoDt: now.toISOString()
    };

    this.changeStartDt = this.changeStartDt.bind(this);
    this.changeFinishDt = this.changeFinishDt.bind(this);
    this.createToolbar = this.createToolbar.bind(this);
    this.submitFilterData = this.submitFilterData.bind(this);
  }

  changeStartDt(event) {
    this.setState({
      startDtString: event.target.value
    });
  }

  changeFinishDt(event) {
    this.setState({
      finishDtString: event.target.value
    });
  }

  submitFilterData() {
    var startDt = Moment(this.state.startDtString, "MM/DD/YYYY HH:mm");
    var finishDt = Moment(this.state.finishDtString, "MM/DD/YYYY HH:mm");
    this.setState({
      startIsoDt: startDt.toISOString(),
      finishIsoDt: finishDt.toISOString()
    });
  }

  createToolbar() {
    var start = this.state.startDtString;
    var finish = this.state.finishDtString;
    return (
      <Form onSubmit={this.submitFilterData}>
        <Container>
          <Row>
            <Col md={1}>
              <Form.Label>Inizio:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type='text'
                name='startDt'
                value={start}
                size='md'
                onChange={this.changeStartDt}
              />
            </Col>
            <Col md={1}>
              <Form.Label>Fine:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control
                type='text'
                name='finishDt'
                value={finish}
                size='md'
                onChange={this.changeFinishDt}
              />
            </Col>
            <Col md={2}>
              <Button variant='primary' type='submit'>
                Filtra
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    );
  }

  render() {
    var toolbar = this.createToolbar();
    return (
      <div>
        <DelphiNavBar />
        <p></p>
        <Container>
          {toolbar}
          <LogSapMasterTable
            startIsoDt={this.state.startIsoDt}
            finishIsoDt={this.state.finishIsoDt}
            maxResults={100}
          />
        </Container>
      </div>
    );
  }
}

export default LogSapPage;
