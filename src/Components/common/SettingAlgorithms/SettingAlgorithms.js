/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";

import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";

export function SettingAlgorithms() {
  document.title = "Настройки алгоритмов";
  const { installationId } = useParams();

  const [dataTableWithFormulas, setDataTableWithFormulas] = useState();
  const [dataForAddInTable, setDataForAddInTable] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("ADD");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await loadDataPage();

      setIsLoading(false);
    })();
  }, [installationId]);

  useEffect(() => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  const loadDataPage = async () => {
    const response = await httpService.sendRequest(API_CONFIG.getDataFormals(installationId).PATH);

    setDataTableWithFormulas(response?.data ?? []);

    setNotification(getNotificationConfig(response.status, ""));
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = (type) => {
    setIsOpenModal(true);
    setTypeModal(type);
  };

  const addDataInTable = async () => {
    setIsLoading(true);
    let statusRequest = "update";

    const { PATH, METHOD, HEADERS } = API_CONFIG.updateFormula(installationId);
    for (const data in dataForAddInTable) {
      if (Object.hasOwnProperty.call(dataForAddInTable, data)) {
        const element = dataForAddInTable[data];

        const { status } = await httpService.sendRequest(PATH, METHOD, element, HEADERS);
        if (status !== "update") {
          statusRequest = "error";
        }
      }
    }

    setNotification(getNotificationConfig(statusRequest));
    await loadDataPage();

    setIsLoading(false);
  };

  const changeDataTable = (indexFormula, indexParameter, { target }) => {
    const tempData = [...dataTableWithFormulas];
    tempData[indexFormula].parameters[indexParameter].value = Number(target.value);

    setDataForAddInTable((prev) => ({ ...prev, [indexFormula]: { ...tempData[indexFormula] } }));
    setDataTableWithFormulas([...tempData]);
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="container">
          <Modal
            isClickOpenModal={isOpenModal}
            actionSuccess={addDataInTable}
            closeModal={closeModal}
            typeModal={typeModal}
          />

          <form className="section-title">
            <fieldset>
              <legend>Алгоритмы:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    {dataTableWithFormulas.map((dataAlgorithm, indexFormula) => {
                      return (
                        <tr key={dataAlgorithm.id}>
                          <th style={{ width: "5%" }}>
                            <label> {dataAlgorithm.name}</label>
                          </th>
                          <th style={{ width: "30%" }}>
                            <label>{dataAlgorithm.description}</label>
                          </th>
                          <td colSpan={2} style={{ width: "30%" }}>
                            {dataAlgorithm?.formulaLabel}
                          </td>
                          <td colSpan={2} style={{ width: "15%" }}>
                            {dataAlgorithm?.parameters.map((parameter, indexParameter) => {
                              return (
                                <div
                                  key={parameter.id}
                                  style={{
                                    padding: "10px 10px",
                                    textAlign: "left",
                                  }}
                                >
                                  <span>{parameter.name}</span>
                                  <input
                                    style={{
                                      marginLeft: "10px",
                                      width: 100,
                                    }}
                                    type="number"
                                    placeholder={parameter.value}
                                    onChange={(event) =>
                                      changeDataTable(indexFormula, indexParameter, event)
                                    }
                                  />
                                </div>
                              );
                            })}
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
                  defaultValue="Сохранить"
                  className="submit"
                  onClick={() => openModal("ADD")}
                />
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
}
