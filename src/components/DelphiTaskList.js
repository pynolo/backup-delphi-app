import React from "react";

import DelphiTask from "./DelphiTask";
import { getUsername } from "./LoginCookie";

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
        this.props.constants.apiEndpoint +
        this.props.constants.apiViewAllTasks +
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
        <DelphiTask
          key={task.id}
          task={task}
          constants={this.props.constants}
        />
      ));
      return (
        <table>
          <thead>
            <tr>
              <td>
                <h3>&nbsp;</h3>
              </td>
              <td>
                <h3>Task</h3>
              </td>
              <td>
                <h3>Area</h3>
              </td>
            </tr>
          </thead>
          <tbody>{taskComponents}</tbody>
        </table>
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
