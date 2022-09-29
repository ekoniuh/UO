/* eslint-disable array-callback-return */
import React from "react";
import "./TBodyRow.css";
import { useData } from "../../../../../requests/getDataInstallation";
import { useParams } from "react-router-dom";

function TextMessage(props) {
  return (
    <td className={props.class + "_color"}>
      <div className="message-box">
        <div className={!props.row.seen ? "text-message bold  name" : "text-message  name"}>
          {props.row[props.cell]}
        </div>
        <div className={!props.row.seen ? "close-email" : "open-email"}></div>
      </div>
    </td>
  );
}

export function TBodyRow(props) {
  let { installationId } = useParams();

  const { updateMessageStatus } = useData();

  function handleClick(item) {
    if (item.seen) {
      return;
    }

    item.seen = true;
    updateMessageStatus(item.id, installationId);
  }

  return (
    <tr>
      {Object.keys(props.row).map((cell, ndx) => {
        if (cell === "code") {
          return (
            <td onClick={() => handleClick(props.row, props.dataMessages)} key={ndx}>
              {/* <td onClick={() => !props.row.seen} key={ndx} className={props.row[cell] && props.class}> */}
              <span className={props.row[cell] && props.class}>{props.row[cell]}</span>
            </td>
          );
        }
        if (cell === "title") {
          return <TextMessage cell={cell} row={props.row} class={props.class} key={ndx} count={props.countMessages} />;
        }
        if (cell === "date") {
          return <td key={ndx}>{props.row[cell]}</td>;
        }
      })}
    </tr>
  );
}
