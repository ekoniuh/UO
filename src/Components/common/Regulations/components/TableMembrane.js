// import { CONFIG_TBODY_MEMBRANE } from "../constant";
import React from "react";

export const TableMembrane = ({
  dataTable,
  changeDataTable,
  openModal,
  configTable,
  actionAdd,
  title,
}) => {
  return (
    <form className="section-title">
      <fieldset>
        <legend>{title}</legend>

        <div>
          <table className="table-data">
            <tbody>
              {configTable.map(([title, nameValue]) => {
                return (
                  <tr key={nameValue}>
                    <th style={{ width: "50%", textAlign: "center" }}>
                      <label>{title}</label>
                    </th>
                    <td>
                      <input
                        min="0"
                        disabled={nameValue === "factRate"}
                        type={nameValue === "producer" ? "text" : "number"}
                        name={nameValue}
                        placeholder={dataTable[nameValue] ?? "-"}
                        onChange={changeDataTable}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-data">
          <input
            type="button"
            className="submit"
            onClick={() => openModal("ADD", dataTable, actionAdd)}
            value="Сохранить"
          />
        </div>
      </fieldset>
    </form>
  );
};
