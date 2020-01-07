import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import DelphiMatchList from "../components/DelphiMatchList";
import DelphiNavBar from "../components/DelphiNavBar";

import appConstants from "../etc/appConstants";

class MatchListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUsername: null,
      userArray: null
    };

    this.loadUserArray = this.loadUserArray.bind(this);
    this.formatUserArray = this.formatUserArray.bind(this);
    this.selectUsername = this.selectUsername.bind(this);
  }

  componentDidMount() {
    this.loadUserArray();
  }

  loadUserArray() {
    let userEndpoint = appConstants.apiEndpoint + appConstants.apiViewAllUsers;
    fetch(userEndpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(restData => {
        if (restData.status >= 400) {
          this.setState({ errorMessage: "Connessione non riuscita" });
        } else {
          this.setState({ userArray: restData });
          //set first selectedUsername
          if (this.state.selectedUsername == null) {
            if (this.state.userArray != null) {
              if (this.state.userArray.length > 0) {
                this.setState({
                  selectedUsername: this.state.userArray[0].username
                });
              }
            }
          }
        }
      })
      .catch(this.setState({ errorMessage: "Connessione non riuscita" }));
  }

  formatUserArray() {
    if (this.state.selectedUsername !== null) {
      return (
        <div className='row'>
          <div className='col-sm-2'>
            <Form.Label>Utente:</Form.Label>
          </div>
          <div className='col-sm-10'>
            <Form.Control
              as='select'
              onChange={this.selectUsername}
              onLoad={this.selectUsername}
              name='role'
              size='sm'
              value={this.state.selectedUsername}
              required>
              {this.state.userArray.map(user => (
                <option key={user.username}>{user.username}</option>
              ))}
            </Form.Control>
          </div>
        </div>
      );
    } else return <div></div>;
  }

  selectUsername(event) {
    console.log("changed");
    this.setState({
      selectedUsername: event.target.value
    });
  }

  render() {
    var userSelect = <div></div>;
    if (this.state.userArray != null) userSelect = this.formatUserArray();
    return (
      <div>
        <DelphiNavBar />
        <Container>
          <Row>
            <Col sm={1}>&nbsp;</Col>
            <Col md='auto'>
              {userSelect}
              <DelphiMatchList selectedUsername={this.state.selectedUsername} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MatchListPage;
