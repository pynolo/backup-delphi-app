import React from "react";
import Badge from "react-bootstrap/Button";

import ExecutionPanel from "./ExecutionPanel";

import appConstants from "../../etc/appConstants";

class DelphiTask extends React.Component {
  render() {
    let row = "";
    if (
      appConstants.environmentFilter === this.props.task.environmentName &&
      appConstants.workspaceFilter === this.props.task.workspaceName
    ) {
      let type = "";
      if (this.props.task.type === "plan") {
        type = (
          <Badge variant='outline-info' size='sm'>
            PLAN
          </Badge>
        );
      }
      row = (
        <tr>
          <td className='align-middle'>
            <span className='font-weight-bold'>
              {this.props.task.name}
              {type}
            </span>
          </td>
          <td>
            <ExecutionPanel
              executable={this.props.task.executable}
              type={this.props.task.type}
            />
          </td>
        </tr>
      );
    } else {
      row = <tr style={{ display: "none" }}></tr>;
    }
    return row;
  }
}

export default DelphiTask;
