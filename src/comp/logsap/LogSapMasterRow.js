import React from "react";
import Moment from "moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Badge } from "react-bootstrap";

class LogSapMasterRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logSap: props.logSap
    };

    //this.loadData = this.loadData.bind(this);
  }

  render() {
    var time = Moment(
      this.state.logSap.dtDataAcq,
      "YYYY-MM-DD'T'HH:mm:ss.SSS'Z'"
    );
    var detailStyle = { display: "none" };
    var type = this.state.logSap.type;
    if (type === "S")
      type = (
        <Badge title='Successo' variant='success'>
          S
        </Badge>
      );
    if (type === "E")
      type = (
        <Badge title='Errore' variant='danger'>
          E
        </Badge>
      );
    if (type === "W")
      type = (
        <Badge title='Anomalia' variant='warning'>
          W
        </Badge>
      );
    if (type === "I")
      type = (
        <Badge title='Informazione' variant='info'>
          I
        </Badge>
      );
    if (type === "Z")
      type = (
        <Badge title='Intervento manuale' variant='secondary'>
          Z
        </Badge>
      );
    let row = (
      <div>
        <Row>
          <Col sm={2}>
            {type}{" "}
            <Badge variant='secondary'>
              {Moment(time).format("DD/MM HH:mm:ss")}
            </Badge>
          </Col>
          <Col sm={10}>
            <small>
              <strong>{this.state.logSap.jobName}</strong>
              {": "}
              {this.state.logSap.message}
            </small>
          </Col>
        </Row>
        <Row style={detailStyle}>
          <Col> </Col>
        </Row>
      </div>
    );
    return row;
  }
}

export default LogSapMasterRow;
