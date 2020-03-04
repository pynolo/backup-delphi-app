import React from "react";
import Form from "react-bootstrap/Form";
import { getUsername } from "../LoginCookie";

import appConstants from "../../etc/appConstants";

class DelphiTaskSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controlName: props.name,
      selectedValue: props.defaultValue,
      taskArray: null,
      username: null
    };

    this.loadData = this.loadData.bind(this);
    this.changeValue = this.changeValue.bind(this);
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

  changeValue(event) {
    this.setState({
      selectedValue: event.target.value
    });
  }

  render() {
    var hasTaskList = false;
    if (this.state.taskArray !== null) {
      if (this.state.taskArray.length > 0) {
        hasTaskList = true;
      }
    }
    if (this.state.username !== null && hasTaskList) {
      return (
        <Form.Control
          as='select'
          name={this.state.controlName}
          value={this.state.selectedValue}
          onChange={this.changeValue}>
          <option key='--' value='--'>
            --
          </option>
          {this.state.taskArray.map(task => (
            <option key={task.id} value={task.name}>
              {task.name}
            </option>
          ))}
        </Form.Control>
      );
    } else
      return (
        <Form.Control as='select' name={this.state.controlName}>
          <option key='null'>--</option>
        </Form.Control>
      );
  }
}

export default DelphiTaskSelect;
