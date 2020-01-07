import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import appConstants from "../etc/appConstants";
import { setUsername } from "./LoginCookie";
import { setRole } from "./LoginCookie";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleError(errorDescription) {
    this.setState({
      loginErrors: errorDescription
    });
  }

  handleSubmit(event) {
    let loginEndpoint = appConstants.apiEndpoint + appConstants.apiAuthenticate;
    let bodyObj = {
      username: event.target.elements.formUsername.value,
      password: event.target.elements.formPassword.value
    };
    fetch(loginEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyObj)
    })
      .then(res => res.json())
      .then(restData => {
        if (restData.status >= 400) {
          this.handleError("Autenticazione non riuscita");
        } else {
          this.handleLogin(restData);
        }
      })
      .catch(error => {
        this.handleError("Autenticazione non riuscita");
      });
    event.preventDefault();
  }

  handleLogin(data) {
    const { username, role } = data;
    this.setState({
      loginErrors: ""
    });
    setUsername(username);
    setRole(role);
    console.log("login effettuato: " + username + " " + role);
    /*this.props.history.push("/tasklist");*/
    window.location.reload();
  }

  render() {
    let warning = "";
    if (this.state.loginErrors != null) {
      if (this.state.loginErrors.length > 0) {
        warning = <Alert variant='danger'>{this.state.loginErrors}</Alert>;
      }
    }
    let out = (
      <div>
        <div className='frontcover'> </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='formUsername'>
            <Form.Label>Nome utente</Form.Label>
            <Form.Control
              type='username'
              name='username'
              onChange={this.handleChange}
              required
            />
            <Form.Text className='text-muted'>
              Il tuo nome utente nella rete Giunti
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              onChange={this.handleChange}
              required
            />
            <Form.Text className='text-muted'>
              La password che usi per la tua postazione
            </Form.Text>
          </Form.Group>
          {warning}
          <Button variant='primary' type='submit'>
            Invia
          </Button>
        </Form>
      </div>
    );
    return out;
  }
}

export default withRouter(LoginForm);
