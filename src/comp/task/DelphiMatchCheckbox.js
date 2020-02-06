import React from "react";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

import appConstants from "../../etc/appConstants";

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
      //console.log("getDerivedStateFromProps no change");
      return null;
    } else {
      //console.log("getDerivedStateFromProps CHANGED");
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
    } else {
      if (prevState.selectedUsername !== this.state.selectedUsername) {
        this.loadValue();
      }
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
        appConstants.apiEndpoint +
        appConstants.apiViewUserTask +
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
    let endpoint = appConstants.apiEndpoint + appConstants.apiChangeUserTask;
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
    let type = "";
    if (this.state.task.type === "plan") {
      type = (
        <Badge variant='info' size='sm'>
          PLAN
        </Badge>
      );
    }
    return (
      <Container fluid='true'>
        <Row noGutters='true'>
          <Col sm='auto'>
            <Form.Check
              type='checkbox'
              name={this.state.executable}
              checked={this.state.match}
              label={this.state.task.name}
              onChange={this.saveValue}
            />
          </Col>
          <Col sm='auto'>{type}</Col>
        </Row>
      </Container>
    );
  }
}
