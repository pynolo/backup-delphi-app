import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import LogSapMasterRow from "./LogSapMasterRow";
import { getUsername } from "../LoginCookie";
import appConstants from "../../etc/appConstants";
import loadingIcon from "../../img/ajax-loader-big-flower-blue.gif";

class LogSapMasterTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logArray: null,
      startIsoDt: props.startIsoDt,
      finishIsoDt: props.finishIsoDt,
      maxResults: props.maxResults,
      username: null,
      isLoading: true
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    let username = getUsername();
    this.setState({ username: username.username }, function() {
      this.loadData();
    }); //asyncronous call to this.loadData()
  }

  //Quando il padre aggiorna le props, questo statico restituisce
  //un oggetto/argomento per setState()
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.startIsoDt !== prevState.startIsoDt ||
      nextProps.finishIsoDt !== prevState.finishIsoDt ||
      nextProps.maxResults !== prevState.maxResults
    ) {
      //console.log("getDerivedStateFromProps CHANGED");
      return {
        startIsoDt: nextProps.startIsoDt,
        finishIsoDt: nextProps.finishIsoDt,
        maxResults: nextProps.maxResults
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.startIsoDt !== this.state.startIsoDt ||
      prevState.finishIsoDt !== this.state.finishIsoDt ||
      prevState.maxResults !== this.state.maxResults
    ) {
      this.setState({
        isLoading: true
      });
      this.loadData();
    }
  }

  loadData() {
    if (this.state.username !== null) {
      let taskEndpoint =
        appConstants.apiEndpoint + appConstants.apiFindSapHierarchicLog;
      let bodyObj = {
        startDatetime: this.state.startIsoDt,
        finishDatetime: this.state.finishIsoDt,
        maxResults: this.state.maxResults,
        username: this.state.username
      };
      fetch(taskEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyObj)
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            logArray: data,
            isLoading: false
          });
        })
        .catch(console.log);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <p>&nbsp;</p>
          <h6>
            <img src={loadingIcon} alt='' /> Caricamento...
          </h6>
        </div>
      );
    }
    var hasLogArray = false;
    if (this.state.logArray !== null) {
      if (this.state.logArray.length > 0) {
        hasLogArray = true;
      }
    }
    if (hasLogArray) {
      var masterComponents = this.state.logArray.map(master => (
        <LogSapMasterRow key={master.idLog} master={master} />
      ));
      return (
        <div>
          <h3>Log SAP</h3>
          <Container>
            <Row>
              <Col md={2}>Log</Col>
              <Col md={10}>Messaggio</Col>
            </Row>
            {masterComponents}
          </Container>
        </div>
      );
    } else
      return (
        <div>
          <p>&nbsp;</p>
          <h6>Nessun log disponibile nel periodo scelto</h6>
        </div>
      );
  }
}

export default LogSapMasterTable;
