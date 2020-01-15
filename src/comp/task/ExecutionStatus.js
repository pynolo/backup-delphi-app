import React from "react";
import Button from "react-bootstrap/Button";

class ExecutionStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Lanciato", response: null };

    this.updateExecution = this.updateExecution.bind(this);
  }

  updateExecution() {
    console.log("update");
    let taskEndpoint =
      this.props.constants.apiEndpoint +
      this.props.constants.apiFindExecution +
      "/" +
      this.props.type +
      "/" +
      this.props.executionId;
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
          message: data.executionStatus,
          response: data
        });
      })
      .catch(error => {
        this.setState({
          message: "Errore",
          response: error
        });
        console.log(error);
      });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateExecution(), 6000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let out = (
      <Button variant='outline-secondary' size='sm'>
        {this.state.message}
      </Button>
    );
    return out;
  }
}

export default ExecutionStatus;
