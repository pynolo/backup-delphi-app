import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class DelphiUserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitErrors: ""
    };
    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleError(errorDescription) {
    this.setState({
      submitErrors: errorDescription
    });
  }

  handleSubmit(event) {
    let taskEndpoint =
      this.props.constants.apiEndpoint + this.props.constants.apiCreateUser;
    let bodyObj = {
      username: event.target.elements.username.value,
      role: event.target.elements.role.value
    };
    fetch(taskEndpoint, {
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
          this.handleError("Impossibile creare l'utente");
        } else {
          window.location.reload();
        }
      })
      .catch(this.handleError("Impossibile creare l'utente"));
    event.preventDefault();
  }

  render() {
    let warning = "";
    if (this.state.submitErrors != null) {
      if (this.state.submitErrors.length > 0) {
        warning = (
          <div className='row'>
            <div className='col-sm-12'>
              <Alert variant='danger'>{this.state.submitErrors}</Alert>
            </div>
          </div>
        );
      }
    }
    let row = (
      <tr>
        <td colSpan='2'>
          <Form onSubmit={this.handleSubmit}>
            <div className='row'>
              <div className='col-sm-1'>
                <Button variant='warning' size='sm' type='submit'>
                  Crea
                </Button>
              </div>
              <div className='col-sm-2'>
                <Form.Label size='sm'>Username:</Form.Label>
              </div>
              <div className='col-sm-4'>
                <Form.Control name='username' size='sm' required />
              </div>
              <div className='col-sm-1'>
                <Form.Label size='sm'>Ruolo:</Form.Label>
              </div>
              <div className='col-sm-4'>
                <Form.Control as='select' name='role' size='sm' required>
                  <option>user</option>
                  <option>admin</option>
                </Form.Control>
              </div>
            </div>
            {warning}
          </Form>
        </td>
      </tr>
    );
    return row;
  }
}

export default DelphiUserCreate;
