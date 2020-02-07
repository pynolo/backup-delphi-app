import React from "react";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { Col } from "react-bootstrap";

import "font-awesome/css/font-awesome.min.css";

import appConstants from "../../etc/appConstants";

export default class DelphiMatchCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      isEditing: false,
      newDescription: this.props.task.description
    };

    this.loadValue = this.loadValue.bind(this);
    this.saveValue = this.saveValue.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  componentDidMount() {
    this.loadValue();
  }

  componentWillUnmount() {
    //if (this.loadValue) {
    //  this.loadValue.cancel();
    //}
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
      description: this.state.newDescription
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
          task: restData,
          isEditing: false,
          newDescription: restData.description
        });
      });
    //.catch(console.log(endpoint + ": Connessione non riuscita"));
  }

  toggleEditing() {
    this.setState({
      isEditing: !this.state.isEditing,
      newDescription: this.state.task.description
    });
  }

  updateDescription(event) {
    const value = event.target.value;
    this.setState({
      newDescription: value
    });
  }

  render() {
    let out = (
      <Form>
        <Form.Row>
          <Col sm='auto'>
            <b>{this.state.newDescription}</b>
          </Col>
          <Col sm='auto'>
            <Badge variant='dark' size='sm' onClick={this.toggleEditing}>
              <i className='fa fa-pencil' aria-hidden='true'></i>
            </Badge>
          </Col>
        </Form.Row>
      </Form>
    );
    if (this.state.isEditing) {
      out = (
        <Form>
          <Form.Row>
            <Col sm='auto'>
              <Form.Control
                type='text'
                size='sm'
                onChange={this.updateDescription}
                value={this.state.newDescription}></Form.Control>
            </Col>
            <Col sm='auto'>
              <Badge variant='dark' size='sm' onClick={this.saveValue}>
                <i className='fa fa-check' aria-hidden='true'></i>
              </Badge>
            </Col>
            <Col sm='auto'>
              <Badge variant='dark' size='sm' onClick={this.toggleEditing}>
                <i className='fa fa-times' aria-hidden='true'></i>
              </Badge>
            </Col>
          </Form.Row>
        </Form>
      );
    }
    return out;
  }
}
