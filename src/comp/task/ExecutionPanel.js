import React from "react";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import appConstants from "../../etc/appConstants";

class ExecutionPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null
    };
    this.longInterval = 6000;
    this.shortInterval = 800;

    this.updateExecution = this.updateExecution.bind(this);
    this.runTask = this.runTask.bind(this);
  }

  updateExecution() {
    //console.log("update");
    let taskEndpoint =
      appConstants.apiEndpoint +
      appConstants.apiFindExecutionByExecutable +
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
          response: data
        });
      })
      .catch(console.log);
  }

  runTask() {
    //console.log("run");
    let taskEndpoint =
      appConstants.apiEndpoint +
      appConstants.apiExecute +
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
          response: data
        });
      })
      .catch(console.log);
    this.interval = setInterval(
      () => this.updateExecution(),
      this.shortInterval
    );
  }

  componentDidMount() {
    this.updateExecution();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //this.updateExecution.cancel();
    //this.runTask.cancel();
  }

  render() {
    let out = <div></div>;
    let isButtonShown = true; //Always true
    let message = "ready";
    let messageClassName = "text-dark";
    if (
      typeof this.state.response !== "undefined" &&
      this.state.response != null
    ) {
      if (
        typeof this.state.response.executionStatus !== "undefined" &&
        this.state.response.executionStatus != null &&
        this.state.response.executionStatus !== ""
      ) {
        message = this.state.response.executionStatus
          .toLowerCase()
          .split("_")
          .join("\xa0");
        // Success: Green
        if (this.state.response.executionStatus === "EXECUTION_SUCCESS") {
          messageClassName = "text-success";
          isButtonShown = true;
          clearInterval(this.interval);
          this.interval = setInterval(
            () => this.updateExecution(),
            this.longInterval
          );
        }
        // Error: Red
        if (
          this.state.response.executionStatus === "EXECUTION_FAILED" ||
          this.state.response.executionStatus === "EXECUTION_TERMINATED"
        ) {
          messageClassName = "text-danger";
          isButtonShown = true;
          clearInterval(this.interval);
          this.interval = setInterval(
            () => this.updateExecution(),
            this.longInterval
          );
        }
        // Ongoing: black && hidden button
        if (
          this.state.response.executionStatus === "STARTING_FLOW_EXECUTION" ||
          this.state.response.executionStatus === "DISPATCHING_FLOW" ||
          this.state.response.executionStatus === "STARTED"
        ) {
          isButtonShown = false;
        }
      } else {
        isButtonShown = true;
      }
      let button = "";
      if (isButtonShown) {
        button = (
          <Button onClick={this.runTask} variant='primary' size='sm'>
            Esegui
          </Button>
        );
      } else {
        button = (
          <Button disabled variant='secondary' size='sm'>
            Esegui
          </Button>
        );
      }
      let execStatus = <span className={messageClassName}>{message}</span>;
      let padded = { paddingLeft: "0.5rem" };
      let popover = (
        <Popover>
          <Popover.Title as='h3'>
            {this.state.response.executionStatus}
          </Popover.Title>
          <Popover.Content>{this.state.response.errorMessage}</Popover.Content>
        </Popover>
      );
      out = (
        <div className='container'>
          <div className='row'>
            <div className='text-left' style={padded}>
              {button}
            </div>
            <OverlayTrigger trigger='click' placement='left' overlay={popover}>
              <div className='text-left' style={padded}>
                {execStatus}
              </div>
            </OverlayTrigger>
          </div>
        </div>
      );
    } else {
      //response = null => waiting
      out = <div>caricamento...</div>;
    }
    return out;
  }
}

export default ExecutionPanel;
