// import { format } from "date-fns";
import { CONFIG_THEAD_TITLE, CONFIG_TBODY } from "../constant";
import { TdTable } from "./TdTable";
import { InputTable } from "./InputTable";

export const Table = ({
  data,
  title,
  openModal,
  changeDataForAdd,
  changeDataForSave,
  getMinAndMaxDate,
  objectForAdd,
  objectForSave,
  actionDelete,
  actionSave,
  actionAdd,
  isEmptyDateInput,
}) => {
  return (
    <div>
      <form className="section-title">
        <fieldset>
          <legend>{title}</legend>
          <table className="table-data">
            <thead>
              <tr>
                {CONFIG_THEAD_TITLE.map((title) => (
                  <th key={title} style={{ width: "10%" }}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index} style={{ border: "1px solid blue" }}>
                    {CONFIG_TBODY.map((cell) => {
                      return index === 0 ? (
                        <InputTable
                          changeDataForSave={changeDataForSave}
                          data={item[cell]}
                          name={cell}
                          index={index}
                          // key={index}
                          actionSave={actionSave}
                          openModal={openModal}
                          objectForSave={objectForSave}
                        />
                      ) : (
                        <TdTable
                          cell={item[cell]}
                          data={data}
                          name={cell}
                          index={item.id}
                          // key={index}
                          openModal={openModal}
                          actionDelete={actionDelete}
                        />
                      );
                    })}
                  </tr>
                );
              })}

              <tr>
                {CONFIG_TBODY.map((cell, index) => {
                  if (index === CONFIG_TBODY.length - 1) return null;
                  return (
                    <td>
                      {cell === "date" ? (
                        <input
                          type={"date"}
                          style={{
                            textAlign: "center",
                            width: "100%",
                            border: isEmptyDateInput ? "2px solid red" : null,
                          }}
                          name={cell}
                          min={getMinAndMaxDate(data)?.minDate}
                          // placeholder={objectForAdd[cell]}
                          onChange={changeDataForAdd}
                        />
                      ) : (
                        <input
                          type={"number"}
                          style={{ textAlign: "center", width: "100%" }}
                          name={cell}
                          placeholder={!!objectForAdd[cell] || ""}
                          onChange={changeDataForAdd}
                          size="5"
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <div className="table-data">
            <input
              type="button"
              name="btn"
              className="submit"
              value="Добавить"
              onClick={() => openModal("ADD", objectForAdd, "", actionAdd)}
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
};
