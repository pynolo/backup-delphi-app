import React from "react";
import Button from "react-bootstrap/Button";

import ExecutionStatus from "./ExecutionStatus";

class ExecutablePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "waiting",
      response: null
    };

    this.runTask = this.runTask.bind(this);
  }

  runTask() {
    let taskEndpoint =
      this.props.constants.apiEndpoint +
      this.props.constants.apiExecuteById +
      "/" +
      this.props.type +
      "/" +
      this.props.executable;
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
          status: "running ",
          response: data
        });
      })
      .catch(console.log);
  }

  render() {
    let row = "loading";
    if (this.state.status === "waiting") {
      row = (
        <Button onClick={this.runTask} variant='primary' size='sm'>
          Esegui
        </Button>
      );
    } else {
      row = (
        <ExecutionStatus
          executionId={this.state.response.executionId}
          type={this.props.type}
          constants={this.props.constants}
        />
      );
    }
    return row;
  }
}

export default ExecutablePanel;
