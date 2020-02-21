import React from "react";
import { Badge } from "react-bootstrap";

class LogSapDetailRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: props.detail
    };
  }

  render() {
    var rowCount = "";
    if (this.state.detail.rowCount > 1)
      rowCount = <Badge variant='dark'>×{this.state.detail.rowCount}</Badge>;
    let row = (
      <tr>
        <td>
          {rowCount}{" "}
          <small>
            <strong>{this.state.detail.zidRecord}</strong>
          </small>
        </td>
        <td>
          <small>{this.state.detail.parameter}</small>
        </td>
        <td>
          <small>{this.state.detail.sdata}</small>
        </td>
      </tr>
    );
    return row;
  }
}

export default LogSapDetailRow;
