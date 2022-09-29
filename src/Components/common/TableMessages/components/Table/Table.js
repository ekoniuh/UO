import React from "react";
import { Thead } from "../THead/THead";
import { TBody } from "../TBody/TBody";

export function Table(props) {
  return (
    <table className="table-data" style={{ marginBottom: "50px" }}>
      <Thead onSortColumns={props.onSortColumns} switchingSort={props.switchingSort} />
      <TBody filters={props.filters} filterText={props.filterText} dataMessages={props.dataMessages} />
    </table>
  );
}
