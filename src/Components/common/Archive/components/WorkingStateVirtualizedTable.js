import { THead } from "./THead";

import { ReactVirtualizedTable } from "../../JournalParameters/components/VirtualizedTable";

export function WorkingStateVirtualizedTable({ dataState: data }) {
  return (
    <div className="table-chart-wrapper">
      <h2 style={{ textAlign: "center", color: "#d8e4e8" }}>Рабочие состояния</h2>
      <THead width={data.length <= 20 ? "100%" : ""} />
      <ReactVirtualizedTable dataState={data} />
    </div>
  );
}
