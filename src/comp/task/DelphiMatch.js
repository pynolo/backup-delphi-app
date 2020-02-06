import React from "react";

import ErrorBoundary from "../../ErrorBoundary";
import DelphiMatchCheckbox from "./DelphiMatchCheckbox";
import DelphiMatchDescription from "./DelphiMatchDescription";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

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
    let row = "";
    if (
      appConstants.environmentFilter === this.state.task.environmentName &&
      appConstants.workspaceFilter === this.state.task.workspaceName
    ) {
      row = (
        <ErrorBoundary>
          <Container fluid='true'>
            <Row noGutters='true'>
              <Col sm='auto'>
                <DelphiMatchCheckbox
                  key={this.state.task.id}
                  selectedUsername={this.state.selectedUsername}
                  task={this.state.task}
                />
              </Col>
              <Col sm='auto'>
                <DelphiMatchDescription
                  key={this.state.task.id}
                  task={this.state.task}
                />
              </Col>
            </Row>
          </Container>
        </ErrorBoundary>
      );
    } else {
      row = <p style={{ display: "none" }}></p>;
    }
    return row;
  }
}

export default DelphiMatch;
