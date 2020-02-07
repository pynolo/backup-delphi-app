import React from "react";
import Button from "react-bootstrap/Button";

import appConstants from "../etc/appConstants";

class DelphiUser extends React.Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser() {
    let taskEndpoint =
      appConstants.apiEndpoint +
      appConstants.apiRemoveUser +
      "/" +
      this.props.user.username;
    fetch(taskEndpoint, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          response: data
        });
      })
      .catch(console.log);
    window.location.reload();
  }

  render() {
    let delButton = <div></div>;
    if (this.props.user.username !== this.props.username) {
      delButton = (
        <Button
          onClick={e => {
            if (
              window.confirm(
                "Confermi l'eliminazione di " + this.props.user.username + "?"
              )
            )
              this.deleteUser(e);
          }}
          variant='warning'
          size='sm'>
          Elimina
        </Button>
      );
    }
    let row = (
      <tr>
        <td>
          <div className='font-weight-bold'>
            {this.props.user.username} ({this.props.user.role})
          </div>
        </td>
        <td>{delButton}</td>
      </tr>
    );
    return row;
  }
}

export default DelphiUser;
