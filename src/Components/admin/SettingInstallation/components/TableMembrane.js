// import { CONFIG_TBODY_MEMBRANE } from "../constant";

export const TableMembrane = ({
  dataMembrane,
  changeDataTableMembrane,
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
                        disabled={nameValue === "factRate"}
                        type="number"
                        name={nameValue}
                        placeholder={dataMembrane[nameValue] ?? "-"}
                        onChange={changeDataTableMembrane}
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
            onClick={() => openModal("ADD", dataMembrane, actionAdd )}
            value="Сохранить"
          />
        </div>
      </fieldset>
    </form>
  );
};
