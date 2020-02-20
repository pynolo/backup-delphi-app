import React from "react";

//import ErrorBoundary from "../../ErrorBoundary";
import DelphiMatchCheckbox from "./DelphiMatchCheckbox";
import DelphiMatchDescription from "./DelphiMatchDescription";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";

import appConstants from "../../etc/appConstants";

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
    if (
      nextProps.task === prevState.task &&
      nextProps.selectedUsername === prevState.selectedUsername
    ) {
      //console.log("getDerivedStateFromProps no change");
      return {};
    } else {
      //console.log("getDerivedStateFromProps CHANGED");
      return {
        task: nextProps.task,
        selectedUsername: nextProps.selectedUsername
      };
    }
  }

  render() {
    let type = "";
    if (this.state.task.type === "plan") {
      type = (
        <Badge variant='info' size='sm'>
          PLAN
        </Badge>
      );
    }
    let row = "";
    if (
      appConstants.environmentFilter === this.state.task.environmentName &&
      appConstants.workspaceFilter === this.state.task.workspaceName
    ) {
      row = (
        <tr>
          <td>
            <DelphiMatchCheckbox
              key={this.state.task.id}
              selectedUsername={this.state.selectedUsername}
              task={this.state.task}
            />
          </td>
          <td>
            <Form>
              <Form.Row>
                <Col sm='auto'>{this.state.task.name}</Col>
                <Col sm='auto'>{type}</Col>
              </Form.Row>
            </Form>
          </td>
          <td>
            <DelphiMatchDescription
              key={this.state.task.id}
              task={this.state.task}
            />
          </td>
        </tr>
      );
    } else {
      row = (
        <tr>
          <td>
            <p style={{ display: "none" }}></p>
          </td>
        </tr>
      );
    }
    return row;
  }
}

export default DelphiMatch;
