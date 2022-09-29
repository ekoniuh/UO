import React from "react";
// import { DatePicker } from "../../../../helpers/";
import ViewsDatePicker from "./DatePicker";

export function MiddleStatesHeader({ isNormalization, changeIsNormalization }) {
  return (
    <div className="header-middle">
      <div className="header-wrapper">
        <div className="select-middle">
          <h2>Журнал параметров:</h2>
          <ViewsDatePicker />
        </div>
        <div className="normalization-wrapper">
          <label>
            <input type="checkbox" checked={isNormalization} onChange={changeIsNormalization} />
            <span>Нормализация</span>
          </label>
        </div>
      </div>
    </div>
  );
}
