import { THead } from "./THead";

import { ReactVirtualizedTable } from "../../JournalParameters/components/VirtualizedTable";

export function DayStateVirtualizedTable({ dataState: data }) {
  return (
    <div className="table-chart-wrapper">
      <THead width={data.length <= 20 ? "100%" : ""} />
      <ReactVirtualizedTable dataState={data} />
    </div>
  );
}
