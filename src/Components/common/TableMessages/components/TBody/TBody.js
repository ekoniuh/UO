// import { ListItemIcon } from "@mui/material";
import React from "react";
import { TBodyRow } from "../TBodyRow/TBodyRow";

export function TBody(props) {
  const filterText = props.filterText.toLowerCase();
  // const filter = [
  //   { type: "info", value: true },
  //   { type: "error", value: true },
  //   { type: "warning", value: true },
  // ];

  return (
    <tbody>
      {props.dataMessages
        // .filter((row) => !!filter.find((item) => item.type === row.type)
        .filter((row) => {
          if (!props.filters.info && !props.filters.warning && !props.filters.error) {
            return true;
          }
          if (row.type === "info" && props.filters.info) {
            return true;
          }
          if (row.type === "warning" && props.filters.warning) {
            return true;
          }
          if (row.type === "error" && props.filters.error) {
            return true;
          }
          return false;
          // if (filter.find((item) => item.type === row.type)) {
          //   return true;
          // }
          // return false;
        })
        .filter((row) => {
          if (!filterText) return true;

          if (row.code) {
            if (
              row.date?.toLowerCase().indexOf(filterText) !== -1 ||
              row.code?.toLowerCase().indexOf(filterText) !== -1 ||
              row.title?.toLowerCase().indexOf(filterText) !== -1
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            if (row.date?.indexOf(filterText) !== -1 || row.title?.indexOf(filterText) !== -1) {
              return true;
            } else {
              return false;
            }
          }
        })
        .map((row, index) => (
          <TBodyRow
            row={row}
            // class={row.type}
            class={row.type.toLowerCase()}
            key={index}
            dataMessages={props.dataMessages}
          />
        ))}
    </tbody>
  );
}
