import React from "react";
import DelphiUser from "./DelphiUser";
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
      <DelphiUser key={user.username} user={user} username={username} />
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
        <table>
          <thead>
            <tr>
              <td>
                <h3>Utenti</h3>
              </td>
              <td>
                <h3>&nbsp;</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> </td>
            </tr>
            {this.state.userComponents}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DelphiUserList;
