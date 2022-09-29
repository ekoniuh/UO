/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import { API_CONFIG } from "../../../constants";
import { DatePicker, getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";
import { CONFIG_MAIN_TABLE, INITIAL_PERIOD, INITIAL_DATA_TABLE } from "./constant";

import "./Wash.css";

export function MembraneWashed() {
  document.title = "Промывка";
  const { installationId } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [period, setPeriod] = useState(INITIAL_PERIOD);

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [dataTable, setDataTable] = useState([INITIAL_DATA_TABLE]);
  const [dataMainTable, setDataMainTable] = useState(INITIAL_DATA_TABLE);
  const [typeModal, setTypeModal] = useState("ADD");
  const [idRowTable, setIdRowTable] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await loadDataPage();
      setDataMainTable((prev) => ({ ...prev, date: period.endDate }));

      setIsLoading(false);
    })();
  }, [installationId]);

  const loadDataPage = async () => {
    const getApiForPeriod = API_CONFIG.getAnalyzePeriod(installationId).PATH;

    const responsePeriod = await httpService.sendRequest(getApiForPeriod);
    const responseDataTable = await httpService.sendRequest(
      API_CONFIG.getAllMembranWash(installationId).PATH
    );

    const { startDate, endDate } =
      responsePeriod.status === "empty" ||
      responsePeriod.status === "error" ||
      responsePeriod?.data?.startDate === ""
        ? INITIAL_PERIOD
        : responsePeriod?.data;

    setPeriod({ startDate, endDate });
    setNotification(getNotificationConfig(responsePeriod.status, "для периода даты"));

    setDataTable(responseDataTable?.data ?? []);
    setNotification(getNotificationConfig(responseDataTable.status, "для таблицы"));
  };

  useEffect(() => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  const addDataWash = async () => {
    setIsLoading(true);
    const { PATH, METHOD, HEADERS } = API_CONFIG.addMembranWash(installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, dataMainTable, HEADERS);

    setNotification(getNotificationConfig(status));

    await loadDataPage(period);
    setDataMainTable({ ...INITIAL_DATA_TABLE });

    setIsLoading(false);
  };

  const deleteDataWash = async () => {
    setIsLoading(true);
    const { PATH, METHOD, HEADERS } = API_CONFIG.deleteMembranWashEvent(installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, dataTable[idRowTable], HEADERS);
    setNotification(getNotificationConfig(status));

    await loadDataPage(period);
    setDataMainTable({ ...INITIAL_DATA_TABLE });
    setIsLoading(false);
  };

  const saveDataWash = async () => {
    setIsLoading(true);
    const { PATH, METHOD, HEADERS } = API_CONFIG.updateMembranWash(installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, dataTable[idRowTable], HEADERS);
    setNotification(getNotificationConfig(status));

    await loadDataPage(period);
    setDataMainTable({ ...CONFIG_MAIN_TABLE });

    setIsLoading(false);
  };

  const handleChangeDate = (date) => {
    setDataMainTable((prev) => ({ ...prev, date: date.toISOString() }));
  };

  const changeDataMainTable = ({ target }) => {
    const { name, value, type } = target;
    setDataMainTable((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const changeDataTable = ({ target }) => {
    const { name, value, id, type } = target;

    dataTable[Number(id)][name] = type === "number" ? Number(value) : value;
    setDataTable([...dataTable]);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = (type, id = "") => {
    setTypeModal(type);
    setIsOpenModal(true);
    setIdRowTable(Number(id));
  };

  const selectAction = () => {
    switch (typeModal) {
      case "ADD":
        return addDataWash();
      case "DELETE":
        return deleteDataWash();
      case "SAVE":
        return saveDataWash();

      default:
        break;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="container">
          <Modal
            isClickOpenModal={isOpenModal}
            actionSuccess={selectAction}
            closeModal={closeModal}
            typeModal={typeModal}
          />
          <form className="table-wash section-title">
            <fieldset>
              <legend>Промывка:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th>Дата</th>
                      <th>Тип</th>
                      <th>Производитель/Наименование</th>
                      <th>Формула</th>
                      <th>Количество,кг</th>
                    </tr>
                    <tr>
                      <td className="date-wash-wrap" rowSpan={4} style={{ position: "relative" }}>
                        <DatePicker
                          color={"#234b59"}
                          customStyle={{ marginLeft: 0, color: "black", background: "red" }}
                          // name="startDate"
                          date={period?.endDate}
                          minDate={period?.startDate}
                          maxDate={period?.endDate}
                          changeDate={handleChangeDate}
                        />
                      </td>
                      <td>Кислая</td>
                      <td>
                        <input
                          className="main-table"
                          type="text"
                          value={dataMainTable.acidProduser}
                          onChange={changeDataMainTable}
                          name="acidProduser"
                        />
                      </td>
                      <td>
                        <input
                          className="main-table"
                          type="text"
                          value={dataMainTable.acidFormula}
                          onChange={changeDataMainTable}
                          name="acidFormula"
                        />
                      </td>
                      <td>
                        <input
                          className="main-table"
                          type="number"
                          step="any"
                          value={dataMainTable.acidCount}
                          onChange={changeDataMainTable}
                          name="acidCount"
                        />
                      </td>
                    </tr>
                    {CONFIG_MAIN_TABLE.map((row) => {
                      return (
                        <tr key={row[0]}>
                          <td>{row[0]}</td>
                          {row[1].map((cell) => {
                            return (
                              <td key={cell}>
                                <input
                                  className="main-table"
                                  step="any"
                                  type={cell.indexOf("Count") > -1 ? "number" : "text"}
                                  value={dataMainTable[cell]}
                                  onChange={changeDataMainTable}
                                  name={cell}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    <tr>
                      <th colSpan={5}>
                        <input
                          type="button"
                          defaultValue="Добавить"
                          className="submit"
                          onClick={() => openModal("ADD")}
                          name="ADD"
                        />
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
          </form>
          <div>
            <table className="table-data  table-wash table-list" width="100%">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Тип</th>
                  <th>Производитель / Наименование</th>
                  <th>Формула</th>
                  <th>Количество, кг</th>
                </tr>
              </thead>
              {dataTable.map((rowTable, index) => {
                return (
                  <tbody key={rowTable.id}>
                    <tr>
                      <td
                        rowSpan={4}
                        style={{
                          borderBottom: "2px solid #3c2b2b",
                          borderTop: "2px solid #3c2b2b",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <DeleteForeverIcon
                            id={index}
                            name="DELETE"
                            sx={{ cursor: "pointer", color: "blue" }}
                            onClick={() => openModal("DELETE", index)}
                          />

                          <span>{format(new Date(rowTable.date), "dd.MM.yyyy")}</span>

                          <SaveIcon
                            onClick={() => openModal("SAVE", index)}
                            id={index}
                            name="SAVE"
                            sx={{ cursor: "pointer", color: "green" }}
                          />
                        </div>
                      </td>
                      <td style={{ borderTop: "2px solid #3c2b2b" }}>Кислая</td>
                      <td style={{ borderTop: "2px solid #3c2b2b" }}>
                        <input
                          type="text"
                          style={{
                            width: "50%",
                            background: "none",
                            border: "none",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          name="acidProduser"
                          size="5"
                          id={index}
                          onChange={changeDataTable}
                          placeholder={rowTable.acidProduser}
                        />
                        {/* {rowTable.acidProduser} */}
                      </td>
                      <td style={{ borderTop: "2px solid #3c2b2b" }}>
                        <input
                          type="text"
                          style={{
                            width: "50%",
                            background: "none",
                            border: "none",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          name="acidFormula"
                          size="5"
                          id={index}
                          onChange={changeDataTable}
                          placeholder={rowTable.acidFormula}
                        />
                      </td>
                      <td style={{ borderTop: "2px solid #3c2b2b" }}>
                        <input
                          type="number"
                          step="any"
                          style={{
                            width: "50%",
                            background: "none",
                            border: "none",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          name="acidCount"
                          size="5"
                          className={`data-input_${index} data-list_item`}
                          id={index}
                          onChange={changeDataTable}
                          placeholder={rowTable.acidCount}
                        />
                      </td>
                    </tr>
                    {CONFIG_MAIN_TABLE.map((rowConfig) => {
                      return (
                        <tr key={rowConfig[0]}>
                          <td>{rowConfig[0]}</td>
                          {rowConfig[1].map((cell) => {
                            return (
                              <td key={cell}>
                                <input
                                  style={{
                                    width: "50%",
                                    background: "none",
                                    border: "none",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                  }}
                                  className={`data-input_${index} data-list_item`}
                                  type={cell.indexOf("Count") > -1 ? "number" : "text"}
                                  placeholder={rowTable[cell]}
                                  id={index}
                                  onChange={changeDataTable}
                                  name={cell}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </>
  );
}
