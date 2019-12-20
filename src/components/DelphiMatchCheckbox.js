import React from "react";
import Form from "react-bootstrap/Form";

export default class DelphiMatchCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.value = false;

    this.loadValue = this.loadValue.bind(this);
    this.saveValue = this.saveValue.bind(this);
    this.loadValue();
  }

  loadValue() {
    let endpoint =
      this.props.constants.apiEndpoint +
      this.props.constants.apiViewUserTask +
      "/" +
      this.props.selectedUsername +
      "/" +
      this.props.task.executable;
    fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(restData => {
        console.log(
          this.props.selectedUsername +
            "/" +
            this.props.task.executable +
            ": " +
            JSON.stringify(restData)
        );
      })
      .catch(error => {
        console.log(
          this.props.selectedUsername +
            "/" +
            this.props.task.executable +
            ": Connessione non riuscita"
        );
      });
  }

  saveValue() {}

  render() {
    let description = this.props.task.name;
    if (this.props.task.type === "plan") {
      description = description + " [PLAN]";
    }
    return (
      <Form.Check
        type='checkbox'
        name='selected'
        label={description}
        value={this.value}
      />
    );
  }
}
