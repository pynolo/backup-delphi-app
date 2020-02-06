import React from "react";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

import "font-awesome/css/font-awesome.min.css";

import appConstants from "../../etc/appConstants";

export default class DelphiMatchCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      isEditing: false
    };

    this.loadValue = this.loadValue.bind(this);
    this.saveValue = this.saveValue.bind(this);
  }

  componentDidMount() {
    this.loadValue();
  }

  componentWillUnmount() {
    if (this.loadValue) {
      this.loadValue.cancel();
    }
  }

  loadValue() {
    if (this.state.task.executable !== null) {
      let endpoint =
        appConstants.apiEndpoint +
        appConstants.apiViewTaskByExecutable +
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
            task: restData
          });
        });
      //.catch(console.log(endpoint + ": Connessione non riuscita"));
    }
  }

  saveValue(event) {
    let endpoint =
      appConstants.apiEndpoint + appConstants.apiChangeTaskDescription;
    let bodyObj = {
      executable: this.state.task.executable,
      description: this.state.task.description
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
          task: restData
        });
      });
    //.catch(console.log(endpoint + ": Connessione non riuscita"));
  }

  render() {
    let out = (
      <Container fluid='true'>
        <Row noGutters='true'>
          <Col sm='auto'>{this.state.task.description}</Col>
          <Col sm='auto'>
            <Badge variant='dark' size='sm'>
              <i class='fa fa-pencil' aria-hidden='true'></i>
            </Badge>
          </Col>
        </Row>
      </Container>
    );
    if (this.state.isEditing) {
      out = (
        <Container fluid='true'>
          <Row noGutters='true'>
            <Col sm='auto'>
              <Form.Text size='sm'>{this.state.task.description}</Form.Text>
            </Col>
            <Col sm='auto'>
              <Badge variant='dark' size='sm'>
                <i class='fa fa-check' aria-hidden='true'></i>
              </Badge>
            </Col>
          </Row>
        </Container>
      );
    }
    return out;
  }
}
