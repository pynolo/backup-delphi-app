import React from "react";
import Form from "react-bootstrap/Form";

export default class DelphiMatchCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      selectedUsername: this.props.selectedUsername,
      value: false
    };

    this.loadValue = this.loadValue.bind(this);
    this.saveValue = this.saveValue.bind(this);
  }

  componentDidMount() {
    this.setState({
      task: this.props.task,
      selectedUsername: this.props.selectedUsername
    });
    this.loadValue();
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
      this.loadValue();
      return {
        task: nextProps.task,
        selectedUsername: nextProps.selectedUsername
      };
    }
  }

  loadValue() {
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
        console.log(endpoint + ": " + JSON.stringify(restData));
      })
      .catch(console.log(endpoint + ": Connessione non riuscita"));
  }

  saveValue(event) {
    let endpoint =
      this.props.constants.apiEndpoint + this.props.constants.apiChangeUserTask;
    let bodyObj = {
      username: this.state.selectedUsername,
      executable: this.state.task.executable,
      match: event.target.value
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
        console.log(endpoint + ": match " + restData.match);
      })
      .catch(console.log(endpoint + ": Connessione non riuscita"));
  }

  render() {
    let description = this.state.task.name;
    if (this.state.task.type === "plan") {
      description = description + " [PLAN]";
    }
    return (
      <Form.Check
        type='checkbox'
        name='selected'
        label={description}
        value={this.state.value}
        onChange={this.saveValue}
      />
    );
  }
}
