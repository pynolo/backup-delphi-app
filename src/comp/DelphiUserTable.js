import React from "react";
import Table from "react-bootstrap/Table";

import DelphiUserRow from "./DelphiUserRow";
import DelphiUserCreate from "./DelphiUserCreate";
import { getUsername } from "./LoginCookie";

import appConstants from "../etc/appConstants";

class DelphiUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "waiting",
      response: null,
      userComponents: null
    };

    this.loadData = this.loadData.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let userEndpoint = appConstants.apiEndpoint + appConstants.apiViewAllUsers;
    fetch(userEndpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          status: "running",
          userArray: data,
          userComponents: null
        });
        this.formatData();
      })
      .catch(console.log);
  }

  formatData() {
    let username = getUsername();
    var userComponents = this.state.userArray.map(user => (
      <DelphiUserRow key={user.username} user={user} username={username} />
    ));
    this.setState({
      status: "running",
      userArray: null,
      userComponents: userComponents
    });
  }

  render() {
    return (
      <div>
        <p></p>
        <DelphiUserCreate />
        <h3>Utenti</h3>
        <Table striped responsive='sm'>
          <thead>
            <tr>
              <th>Utente e ruolo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>{this.state.userComponents}</tbody>
        </Table>
      </div>
    );
  }
}

export default DelphiUserList;
