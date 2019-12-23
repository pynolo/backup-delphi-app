import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import DelphiMatchCheckbox from "./DelphiMatchCheckbox";

class DelphiMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      selectedUsername: this.props.selectedUsername
    };
  }

  componentDidMount() {
    this.setState({
      task: this.props.task,
      selectedUsername: this.props.selectedUsername
    });
  }

  //Quando il padre aggiorna le props, questo statico restituisce un oggetto/argomento per setState()
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.task === prevState.task &&
      nextProps.selectedUsername === prevState.selectedUsername
      ? {}
      : {
          task: nextProps.task,
          selectedUsername: nextProps.selectedUsername
        };
  }

  render() {
    let row = "";
    if (
      this.props.constants.environmentFilter ===
        this.state.task.environmentName &&
      this.props.constants.workspaceFilter === this.state.task.workspaceName
    ) {
      row = (
        <tr>
          <td>
            <ErrorBoundary>
              <DelphiMatchCheckbox
                key={this.state.task.id}
                selectedUsername={this.state.selectedUsername}
                task={this.state.task}
                constants={this.props.constants}
              />
            </ErrorBoundary>
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
