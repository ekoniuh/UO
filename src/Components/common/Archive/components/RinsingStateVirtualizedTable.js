import { THead } from "../components/THead";

import { ReactVirtualizedTable } from "../../JournalParameters/components/VirtualizedTable";

export function RinsingStateVirtualizedTable({ dataState: data }) {
  return (
    <div className="table-chart-wrapper">
      <h2 style={{ textAlign: "center", color: "#d8e4e8" }}>
        Промывочные состояния
      </h2>
      <THead width={data.length <= 20 ? "100%" : ""} />
      <ReactVirtualizedTable dataState={data} />
    </div>
  );
}
