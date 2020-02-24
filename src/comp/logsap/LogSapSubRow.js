import React from "react";

export default function LogSapSubRow(props) {
  let row = (
    <tr>
      <td>
        <small>
          <strong>{props.sub.zidRecord}</strong>
        </small>
      </td>
      <td>
        <small>
          {props.sub.parameter}{" "}
          <i className='fa fa-file-text' aria-hidden='true'></i>{" "}
          {props.sub.sdata}
        </small>
      </td>
    </tr>
  );
  return row;
}
