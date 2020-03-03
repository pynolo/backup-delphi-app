import React from "react";
import { Redirect } from "react-router-dom";
import Moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import DelphiTaskSelect from "../task/DelphiTaskSelect";
import LogSapMasterTable from "./LogSapMasterTable";
import DelphiNavBar from "../DelphiNavBar";

import appConstants from "../../etc/appConstants";

class LogSapPage extends React.Component {
  constructor(props) {
    super(props);
    var yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 24);
    //var startTime = Moment(yesterday).format("DD/MM/YYYY HH:mm");
    var startIsoDt = yesterday.toISOString();
    if (props.match.params.startIsoDt != null)
      startIsoDt = props.match.params.startIsoDt;

    var now = new Date();
    //var finishTime = Moment(now).format("DD/MM/YYYY HH:mm");
    var finishIsoDt = now.toISOString();
    if (props.match.params.finishIsoDt != null)
      finishIsoDt = props.match.params.finishIsoDt;

    var maxResults = appConstants.logSapMaxResults;
    if (props.match.params.maxResults != null)
      maxResults = props.match.params.maxResults;

    var taskName = "--";
    if (props.match.params.taskName != null)
      taskName = props.match.params.taskName;

    this.state = {
      startIsoDt: startIsoDt,
      finishIsoDt: finishIsoDt,
      maxResults: maxResults,
      taskName: taskName
    };

    //this.changeStartDt = this.changeStartDt.bind(this);
    //this.changeFinishDt = this.changeFinishDt.bind(this);
    //this.changeMaxResults = this.changeMaxResults.bind(this);
    this.createToolbar = this.createToolbar.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  //changeStartDt(event) {
  //  var startDt = Moment(event.target.value, "DD/MM/YYYY HH:mm");
  //  this.setState({
  //    startIsoDt: startDt.toISOString()
  //  });
  //}

  //changeFinishDt(event) {
  //  var finishDt = Moment(event.target.value, "DD/MM/YYYY HH:mm");
  //  this.setState({
  //    finishIsoDt: finishDt.toISOString()
  //  });
  //}

  //changeMaxResults(event) {
  //  this.setState({
  //    maxResultsForm: event.target.value
  //  });
  //}

  submitData(event) {
    //event.preventDefault();
    var startDt = new Date();
    if (event.target.elements.startDt != null)
      startDt = Moment(event.target.elements.startDt.value, "DD/MM/YYYY HH:mm");
    var finishDt = new Date();
    if (event.target.elements.finishDt != null)
      finishDt = Moment(
        event.target.elements.finishDt.value,
        "DD/MM/YYYY HH:mm"
      );
    var maxResults = 200;
    if (event.target.elements.maxResults != null)
      maxResults = event.target.elements.maxResults.value;
    var taskName = "--";
    if (event.target.elements.taskName != null)
      taskName = event.target.elements.taskName.value;
    var formUrl =
      "/logsap/" +
      maxResults +
      "/" +
      startDt.toISOString() +
      "/" +
      finishDt.toISOString();
    if (taskName.length > 2) {
      formUrl =
        "/logsap/" +
        maxResults +
        "/" +
        startDt.toISOString() +
        "/" +
        finishDt.toISOString() +
        "/" +
        taskName;
    }
    return <Redirect to={formUrl} />;
  }

  createToolbar() {
    var startDt = Moment(this.state.startIsoDt, "YYYY-MM-DDTHH:mm:ss.sssZ");
    var finishDt = Moment(this.state.finishIsoDt, "YYYY-MM-DDTHH:mm:ss.sssZ");
    var start = Moment(startDt).format("DD/MM/YYYY HH:mm");
    var finish = Moment(finishDt).format("DD/MM/YYYY HH:mm");
    var max = this.state.maxResults;
    var taskName = this.state.taskName;
    return (
      <Form onSubmit={this.submitData}>
        <Row>
          <Col md={1}>
            <Form.Label>Inizio:</Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control
              type='text'
              name='startDt'
              defaultValue={start}
              size='md'
            />
          </Col>
          <Col md={1}>
            <Form.Label>Fine:</Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control
              type='text'
              name='finishDt'
              defaultValue={finish}
              size='md'
            />
          </Col>
          <Col md={1}>
            <Form.Label>Limite:</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type='text'
              name='maxResults'
              defaultValue={max}
              size='md'
            />
          </Col>
        </Row>
        <Row>
          <Col md={1}>
            <Form.Label>Task:</Form.Label>
          </Col>
          <Col md={10}>
            <DelphiTaskSelect
              type='text'
              name='taskName'
              defaultValue={taskName}
              size='md'
            />
          </Col>
          <Col md={1}>
            <Button variant='primary' type='submit'>
              Filtra
            </Button>
          </Col>
        </Row>
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
            maxResults={this.state.maxResults}
          />
        </Container>
      </div>
    );
  }
}

export default LogSapPage;
