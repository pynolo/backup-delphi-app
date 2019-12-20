import React from "react";
import DelphiUser from "./DelphiUser";
import DelphiUserCreate from "./DelphiUserCreate";
import { getUsername } from "./LoginCookie";

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
    this.loadData();
  }

  loadData() {
    let userEndpoint =
      this.props.constants.apiEndpoint + this.props.constants.apiViewAllUsers;
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
      <DelphiUser
        key={user.username}
        user={user}
        username={username}
        constants={this.props.constants}
      />
    ));
    this.setState({
      status: "running",
      userArray: null,
      userComponents: userComponents
    });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>
              <h3>&nbsp;</h3>
            </td>
            <td>
              <h3>Utenti e ruoli</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          {this.state.userComponents}
          <DelphiUserCreate constants={this.props.constants} />
        </tbody>
      </table>
    );
  }
}

export default DelphiUserList;