import React from "react";
import Badge from "react-bootstrap/Button";

import ExecutionPanel from "./ExecutionPanel";

import appConstants from "../../etc/appConstants";

class DelphiTask extends React.Component {
  render() {
    let title = this.props.task.name;
    let subtitle = "";
    if (this.props.task.description !== null) {
      if (this.props.task.description.length > 0) {
        title = this.props.task.description;
        subtitle = (
          <span>
            <br />
            {this.props.task.name}
          </span>
        );
      }
    }

    let row = "";
    if (
      appConstants.environmentFilter === this.props.task.environmentName &&
      appConstants.workspaceFilter === this.props.task.workspaceName
    ) {
      let type = "";
      if (this.props.task.type === "plan") {
        type = (
          <Badge disabled variant='outline-info' size='sm'>
            PLAN
          </Badge>
        );
      }
      row = (
        <tr>
          <td className='align-middle'>
            <span className='font-weight-bold'>
              {title}
              {type}
            </span>
            {subtitle}
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
