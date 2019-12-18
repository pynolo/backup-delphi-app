import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class DelphiUserCreate extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let taskEndpoint =
      this.props.constants.apiEndpoint +
      this.props.constants.apiCreateUser +
      "/";
    let bodyObj = {
      username: event,
      type: event
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
      .then(data => {
        this.setState({
          response: data
        });
      })
      .catch(console.log);
    window.location.reload();
    event.preventDefault();
  }

  render() {
    let row = (
      <tr>
        <td colSpan='2'>
          <Form onSubmit={this.handleSubmit}>
            <Button variant='warning' size='sm' type='submit'>
              Crea
            </Button>
            <Form.Label>Nome utente:</Form.Label>
            <Form.Control name='username' required />
            <Form.Label>Ruolo:</Form.Label>
            <Form.Control as='select' name='type' required>
              <option>user</option>
              <option>admin</option>
            </Form.Control>
          </Form>
        </td>
      </tr>
    );
    return row;
  }
}

export default DelphiUserCreate;
