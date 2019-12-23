import React from "react";
import Form from "react-bootstrap/Form";

export default class DelphiMatchCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      selectedUsername: this.props.selectedUsername,
      match: false
    };

    this.loadValue = this.loadValue.bind(this);
    this.saveValue = this.saveValue.bind(this);
  }

  //Quando il padre aggiorna le props, questo statico restituisce
  //un oggetto/argomento per setState()
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.task === prevState.task &&
      nextProps.selectedUsername === prevState.selectedUsername
    ) {
      return null;
    } else {
      return {
        task: nextProps.task,
        selectedUsername: nextProps.selectedUsername
      };
    }
  }

  componentDidMount() {
    this.loadValue();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.match === null) {
      this.loadValue();
    }
  }

  componentWillUnmount() {
    if (this.loadValue) {
      this.loadValue.cancel();
    }
  }

  loadValue() {
    if (
      this.state.selectedUsername !== null &&
      this.state.task.executable !== null
    ) {
      let endpoint =
        this.props.constants.apiEndpoint +
        this.props.constants.apiViewUserTask +
        "/" +
        this.state.selectedUsername +
        "/" +
        this.state.task.executable;
      fetch(endpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(restData => {
          this.setState({
            username: restData.username,
            executable: restData.executable,
            match: restData.match
          });
        });
      //.catch(console.log(endpoint + ": Connessione non riuscita"));
    }
  }

  saveValue(event) {
    let endpoint =
      this.props.constants.apiEndpoint + this.props.constants.apiChangeUserTask;
    let bodyObj = {
      username: this.state.selectedUsername,
      executable: this.state.task.executable,
      match: event.target.checked
    };
    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyObj)
    })
      .then(res => res.json())
      .then(restData => {
        this.setState({
          username: restData.username,
          executable: restData.executable,
          match: restData.match
        });
      });
    //.catch(console.log(endpoint + ": Connessione non riuscita"));
  }

  render() {
    let description = this.state.task.name;
    if (this.state.task.type === "plan") {
      description = description + " [PLAN]";
    }
    return (
      <Form.Check
        type='checkbox'
        name={this.state.executable}
        label={description}
        checked={this.state.match}
        onChange={this.saveValue}
      />
    );
  }
}
