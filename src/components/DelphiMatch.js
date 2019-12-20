import React from "react";

import DelphiMatchCheckbox from "./DelphiMatchCheckbox";

class DelphiMatch extends React.Component {
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
            <DelphiMatchCheckbox
              key={this.props.task.id}
              selectedUsername={this.props.selectedUsername}
              task={this.props.task}
              constants={this.props.constants}
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

export default DelphiMatch;
