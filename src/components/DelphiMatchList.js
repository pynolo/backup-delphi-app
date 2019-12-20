import React from "react";
import Form from "react-bootstrap/Form";

import DelphiMatch from "./DelphiMatch";

class DelphiMatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUsername: null,
      userArray: null,
      taskArray: null,
      errorMessage: null
    };

    this.loadTaskArray = this.loadTaskArray.bind(this);
    this.loadUserArray = this.loadUserArray.bind(this);
    this.formatTaskArray = this.formatTaskArray.bind(this);
    this.formatUserArray = this.formatUserArray.bind(this);
    this.selectUsername = this.selectUsername.bind(this);
  }

  componentDidMount() {
    this.loadUserArray();
  }

  loadUserArray() {
    let userEndpoint =
      this.props.constants.apiEndpoint + this.props.constants.apiViewAllUsers;
    fetch(userEndpoint, {
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
          this.setState({ userArray: restData });
          //set first selectedUsername
          if (this.state.selectedUsername == null) {
            if (this.state.userArray != null) {
              if (this.state.userArray.length > 0) {
                this.setState({
                  selectedUsername: this.state.userArray[0].username
                });
              }
            }
          }
          //continue loading tasks
          this.loadTaskArray();
        }
      })
      .catch(this.setState({ errorMessage: "Connessione non riuscita" }));
  }

  formatUserArray() {
    return (
      <div className='row'>
        <div className='col-sm-2'>
          <Form.Label>Utente:</Form.Label>
        </div>
        <div className='col-sm-10'>
          <Form.Control
            as='select'
            onChange={this.selectUsername}
            onLoad={this.selectUsername}
            name='role'
            size='sm'
            value={this.state.selectedUsername}
            required>
            {this.state.userArray.map(user => (
              <option key={user.username}>{user.username}</option>
            ))}
          </Form.Control>
        </div>
      </div>
    );
  }

  loadTaskArray() {
    let taskEndpoint =
      this.props.constants.apiEndpoint + this.props.constants.apiViewAllTasks;
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
      <DelphiMatch
        key={task.id}
        task={task}
        selectedUsername={this.state.selectedUsername}
        constants={this.props.constants}
      />
    ));
  }

  selectUsername(event) {
    console.log("changed");
    this.setState({
      selectedUsername: event.target.value
    });
  }

  render() {
    var userSelect = "";
    var taskList = (
      <tr>
        <td></td>
      </tr>
    );
    if (this.state.userArray != null) userSelect = this.formatUserArray();
    if (this.state.taskArray != null) taskList = this.formatTaskArray();
    return (
      <div>
        <p>
          In questa pagina è possibile selezionare quali saranno i task visibili
          per ciascun utente di Delphi
        </p>
        {userSelect}
        <table>
          <thead>
            <tr>
              <td>
                <h3>Visibilità</h3>
              </td>
            </tr>
          </thead>
          <tbody>{taskList}</tbody>
        </table>
      </div>
    );
  }
}

export default DelphiMatchList;
