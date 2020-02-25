import React from "react";
import Moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import LogSapMasterTable from "../comp/logsap/LogSapMasterTable";
import DelphiNavBar from "../comp/DelphiNavBar";

import appConstants from "../etc/appConstants";

class LogSapPage extends React.Component {
  constructor(props) {
    super(props);
    var yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 24);
    var yesterString = Moment(yesterday).format("DD/MM/YYYY HH:mm");
    var now = new Date();
    var nowString = Moment(now).format("DD/MM/YYYY HH:mm");
    var maxResults = appConstants.logSapMaxResults;
    this.state = {
      startDtForm: yesterString,
      finishDtForm: nowString,
      maxResultsForm: maxResults,
      startIsoDt: yesterday.toISOString(),
      finishIsoDt: now.toISOString(),
      maxResults: maxResults
    };

    this.changeStartDt = this.changeStartDt.bind(this);
    this.changeFinishDt = this.changeFinishDt.bind(this);
    this.changeMaxResults = this.changeMaxResults.bind(this);
    this.createToolbar = this.createToolbar.bind(this);
    this.submitFilterData = this.submitFilterData.bind(this);
  }

  changeStartDt(event) {
    this.setState({
      startDtForm: event.target.value
    });
  }

  changeFinishDt(event) {
    this.setState({
      finishDtForm: event.target.value
    });
  }

  changeMaxResults(event) {
    this.setState({
      maxResultsForm: event.target.value
    });
  }

  submitFilterData() {
    var startDt = Moment(this.state.startDtForm, "DD/MM/YYYY HH:mm");
    var finishDt = Moment(this.state.finishDtForm, "DD/MM/YYYY HH:mm");
    this.setState({
      startIsoDt: startDt.toISOString(),
      finishIsoDt: finishDt.toISOString(),
      maxResults: this.state.maxResultsForm
    });
  }

  createToolbar() {
    var start = this.state.startDtForm;
    var finish = this.state.finishDtForm;
    var max = this.state.maxResultsForm;
    return (
      <Container>
        <Row>
          <Col md={1}>
            <Form.Label>Inizio:</Form.Label>
          </Col>
          <Col md={3}>
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
          <Col md={3}>
            <Form.Control
              type='text'
              name='finishDt'
              value={finish}
              size='md'
              onChange={this.changeFinishDt}
            />
          </Col>
          <Col md={1}>
            <Form.Label>Limite:</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type='text'
              name='maxResults'
              value={max}
              size='md'
              onChange={this.changeMaxResults}
            />
          </Col>
          <Col md={1}>
            <Button variant='primary' onClick={this.submitFilterData}>
              Filtra
            </Button>
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
          {toolbar}
          <LogSapMasterTable
            startIsoDt={this.state.startIsoDt}
            finishIsoDt={this.state.finishIsoDt}
            maxResults={this.state.maxResults}
          />
        </Container>
      </div>
    );
  }
}

export default LogSapPage;
