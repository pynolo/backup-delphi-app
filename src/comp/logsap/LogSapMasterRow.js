import React from "react";
import Moment from "moment";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Badge } from "react-bootstrap";

import LogSapDetailRow from "./LogSapDetailRow";

class LogSapMasterRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      master: props.master,
      showDetail: false
    };

    this.toggleDetail = this.toggleDetail.bind(this);
  }

  toggleDetail() {
    this.setState({
      showDetail: !this.state.showDetail
    });
  }

  render() {
    var time = Moment(
      this.state.master.dtDataAcq,
      "YYYY-MM-DD'T'HH:mm:ss.SSS'Z'"
    );

    var caret = <i className='fa fa-caret-right' aria-hidden='true'></i>;
    if (this.state.showDetail)
      caret = <i className='fa fa-caret-down' aria-hidden='true'></i>;

    var detailStyle = { display: "none" };
    if (this.state.showDetail) detailStyle = { display: "block" };

    var detailComponents = this.state.master.detailList.map(detail => (
      <LogSapDetailRow key={detail.idLog} detail={detail} />
    ));

    var rowCount = "";
    if (this.state.master.rowCount > 1)
      rowCount = <Badge variant='dark'>×{this.state.master.rowCount}</Badge>;
    var type = this.state.master.type;
    var title = "";
    var variant = "";
    if (type === "S") {
      title = "Successo";
      variant = "success";
    }
    if (type === "E") {
      title = "Errore";
      variant = "danger";
    }
    if (type === "W") {
      title = "Anomalia";
      variant = "warning";
    }
    if (type === "I") {
      title = "Informazione";
      variant = "info";
    }
    if (type === "Z") {
      title = "Intervento manuale";
      variant = "secondary";
    }
    let row = (
      <div>
        <Row>
          <Col sm={2}>
            <Badge title={title} variant={variant}>
              {type}
            </Badge>
            <Badge variant='secondary'>
              {Moment(time).format("DD/MM HH:mm:ss")}
            </Badge>
          </Col>
          <Col sm={10}>
            <div onClick={this.toggleDetail}>
              {caret}
              {rowCount}{" "}
              <small>
                <strong>{this.state.master.jobName}</strong> {" - "}
                {this.state.master.message}
              </small>
            </div>
          </Col>
        </Row>
        <Row>
          <Table striped responsive='sm' style={detailStyle}>
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
            <tbody>{detailComponents}</tbody>
          </Table>
        </Row>
      </div>
    );
    return row;
  }
}

export default LogSapMasterRow;
