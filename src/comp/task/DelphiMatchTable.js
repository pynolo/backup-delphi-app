import React from "react";
import Table from "react-bootstrap/Table";

import DelphiMatchRow from "./DelphiMatchRow";

import appConstants from "../../etc/appConstants";

class DelphiMatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUsername: props.selectedUsername,
      taskArray: null,
      errorMessage: null
    };

    this.loadTaskArray = this.loadTaskArray.bind(this);
    this.formatTaskArray = this.formatTaskArray.bind(this);
  }

  //Quando il padre aggiorna le props, questo statico restituisce
  //un oggetto/argomento per setState()
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedUsername === prevState.selectedUsername) {
      //console.log("getDerivedStateFromProps no change");
      return {};
    } else {
      //console.log("getDerivedStateFromProps CHANGED");
      return {
        selectedUsername: nextProps.selectedUsername
      };
    }
  }

  componentDidMount() {
    this.loadTaskArray();
  }

  /*componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedUsername !== prevState.selectedUsername) {
      console.log("componentDidUpdate CHANGED");
      this.loadTaskArray();
    }
  }*/

  loadTaskArray() {
    let taskEndpoint = appConstants.apiEndpoint + appConstants.apiViewAllTasks;
    fetch(taskEndpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(restData => {
        if (restData.status >= 400) {
          this.setState({ errorMessage: "Connessione non riuscita" });
        } else {
          this.setState({ taskArray: restData });
        }
      })
      .catch(this.setState({ errorMessage: "Connessione non riuscita" }));
  }

  formatTaskArray() {
    return this.state.taskArray.map(task => (
      <DelphiMatchRow
        key={task.id}
        task={task}
        selectedUsername={this.state.selectedUsername}
      />
    ));
  }

  render() {
    var taskList = <p></p>;
    if (this.state.taskArray != null) taskList = this.formatTaskArray();
    return (
      <div style={{ width: "100%" }}>
        <h3>
          Visualizzazione ({appConstants.workspaceFilter.toLowerCase()}{" "}
          {appConstants.environmentFilter.toLowerCase()})
        </h3>
        <Table striped responsive='sm'>
          <thead>
            <tr>
              <th>
                <i class='fa fa-eye' aria-hidden='true'></i>
              </th>
              <th>Task</th>
              <th>Descrizione</th>
            </tr>
          </thead>
          <tbody>{taskList}</tbody>
        </Table>
      </div>
    );
  }
}

export default DelphiMatchList;
