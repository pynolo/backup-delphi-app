import React from "react";
import ExecutablePanel from "./ExecutablePanel";

class DelphiTask extends React.Component {
  render() {
    let row = "";
    if (
      this.props.constants.environmentFilter ===
        this.props.task.environmentName &&
      this.props.constants.workspaceFilter === this.props.task.workspaceName
    ) {
      row = (
        <tr>
          <td>
            <ExecutablePanel
              executable={this.props.task.executable}
              constants={this.props.constants}
            />
            &nbsp;
          </td>
          <td>
            <b>{this.props.task.name}</b>
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
