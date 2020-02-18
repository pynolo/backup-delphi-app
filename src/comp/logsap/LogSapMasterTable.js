import React from "react";
import Table from "react-bootstrap/Table";

import LogSapMasterRow from "./LogSapMasterRow";
import { getUsername } from "../LoginCookie";
import appConstants from "../../etc/appConstants";

class LogSapMasterTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logArray: null,
      startDatetime: props.startDatetime,
      finishDatetime: props.finishDatetime,
      maxResults: 100,
      username: null
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    let username = getUsername();
    this.setState({ username: username.username }, function() {
      this.loadData();
    }); //asyncronous call to this.loadData()
  }

  loadData() {
    if (this.state.username !== null) {
      let taskEndpoint =
        appConstants.apiEndpoint + appConstants.apiFindSapFilteredMaster;
      let bodyObj = {
        startDatetime: this.state.startDatetime,
        finishDatetime: this.state.finishDatetime,
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
            logArray: data
          });
        })
        .catch(console.log);
    }
  }

  render() {
    var hasLogArray = false;
    if (this.state.logArray !== null) {
      if (this.state.logArray.length > 0) {
        hasLogArray = true;
      }
    }
    if (this.state.username !== null && hasLogArray) {
      var logSapComponents = this.state.logArray.map(logSap => (
        <LogSapMasterRow key={logSap.idSap} logSap={logSap} />
      ));
      return (
        <div>
          <h3>Log SAP</h3>
          <Table striped responsive='sm'>
            <thead>
              <tr>
                <th>Task</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>{logSapComponents}</tbody>
          </Table>
        </div>
      );
    } else
      return (
        <div>
          <p>&nbsp;</p>
          <h4>Nessun log disponibile nel periodo scelto</h4>
        </div>
      );
  }
}

export default LogSapMasterTable;
