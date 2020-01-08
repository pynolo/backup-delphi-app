import React from "react";
import Badge from "react-bootstrap/Button";

import ExecutablePanel from "./ExecutablePanel";

class DelphiTask extends React.Component {
  render() {
    let row = "";
    if (
      this.props.constants.environmentFilter ===
        this.props.task.environmentName &&
      this.props.constants.workspaceFilter === this.props.task.workspaceName
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
          <td>
            <ExecutablePanel
              executable={this.props.task.executable}
              type={this.props.task.type}
              constants={this.props.constants}
            />
            &nbsp;
          </td>
          <td>
            <div className='font-weight-bold'>
              {this.props.task.name}
              {type}
            </div>
          </td>
          <td>
            {this.props.task.workspaceName} {this.props.task.environmentName}
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
