import React from "react";
import Table from "react-bootstrap/Table";
import { Badge } from "react-bootstrap";

import LogSapSubRow from "./LogSapSubRow";

class LogSapDetailRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: props.detail,
      showSub: false
    };

    this.toggleSub = this.toggleSub.bind(this);
  }

  toggleSub() {
    this.setState({
      showSub: !this.state.showSub
    });
  }

  render() {
    var subStyle = { display: "none" };
    if (this.state.showSub) subStyle = { display: "block" };
    var subComponents = this.state.detail.subList.map(sub => (
      <LogSapSubRow key={sub.idLog} sub={sub} />
    ));

    var caret = "";
    var rowCount = "";
    var toggleFunction = null;
    if (this.state.detail.rowCount > 1) {
      toggleFunction = this.toggleSub;
      caret = <i className='fa fa-caret-right' aria-hidden='true'></i>;
      if (this.state.showSub)
        caret = <i className='fa fa-caret-down' aria-hidden='true'></i>;
      rowCount = <Badge variant='dark'>×{this.state.detail.rowCount}</Badge>;
    }
    let row = (
      <tr>
        <td>
          <div onClick={toggleFunction}>
            {caret} {rowCount}{" "}
            <small>
              <strong>{this.state.detail.zidRecord}</strong>
            </small>
          </div>
        </td>
        <td>
          <div onClick={toggleFunction}>
            <small>
              {this.state.detail.parameter}{" "}
              <i className='fa fa-file-text' aria-hidden='true'></i>{" "}
              {this.state.detail.sdata}
            </small>
          </div>
          <Table striped responsive='sm' style={subStyle}>
            <thead>
              <tr>
                <th>
                  <small>Record</small>
                </th>
                <th>
                  <small>
                    Param <i className='fa fa-file-text' aria-hidden='true'></i>{" "}
                    Dati inviati a SAP
                  </small>
                </th>
              </tr>
            </thead>
            <tbody>{subComponents}</tbody>
          </Table>
        </td>
      </tr>
    );
    return row;
  }
}

export default LogSapDetailRow;
