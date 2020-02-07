import React from "react";
import Table from "react-bootstrap/Table";

import DelphiTaskRow from "./DelphiTaskRow";
import { getUsername } from "../LoginCookie";
import appConstants from "../../etc/appConstants";

class DelphiTaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskArray: null,
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
        appConstants.apiEndpoint +
        appConstants.apiViewAllTasks +
        "/" +
        this.state.username;
      taskEndpoint = encodeURI(taskEndpoint);
      fetch(taskEndpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            taskArray: data
          });
        })
        .catch(console.log);
    }
  }

  render() {
    var hasTaskList = false;
    if (this.state.taskArray !== null) {
      if (this.state.taskArray.length > 0) {
        hasTaskList = true;
      }
    }
    if (this.state.username !== null && hasTaskList) {
      var taskComponents = this.state.taskArray.map(task => (
        <DelphiTaskRow key={task.id} task={task} />
      ));
      return (
        <div>
          <h3>
            Elenco task - {appConstants.workspaceFilter}{" "}
            {appConstants.environmentFilter}
          </h3>
          <Table striped responsive='sm'>
            <thead>
              <tr>
                <th>Task</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>{taskComponents}</tbody>
          </Table>
        </div>
      );
    } else
      return (
        <div>
          <h3>Nessun task disponibile</h3>
          <p>
            Non sono stati ancora assegnati dei task a{" "}
            <b>{this.state.username}</b>.
          </p>
          <p>
            Chiedi agli amministratori di <b>Delphi</b> di configurare il tuo
            account.
          </p>
        </div>
      );
  }
}

export default DelphiTaskList;
