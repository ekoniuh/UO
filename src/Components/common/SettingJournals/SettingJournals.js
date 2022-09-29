/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";

import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";

export function SettingJournals() {
  document.title = "Настройки журналов";
  const { installationId } = useParams();
  const [dataStartState, setDataStartState] = useState();
  const [dataRinsingState, setDataRinsingState] = useState();
  const [currentData, setCurrentData] = useState();
  const [nameAction, setNameAction] = useState();

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
    const responseStartState = await httpService.sendRequest(
      API_CONFIG.getSettings(installationId).PATH
    );
    const responseRinsingState = await httpService.sendRequest(
      API_CONFIG.getRinsingParams(installationId).PATH
    );

    setDataStartState(responseStartState?.data);
    setDataRinsingState(responseRinsingState?.data);

    setNotification(getNotificationConfig(responseStartState.status, "для стартовых состояний"));
    setNotification(
      getNotificationConfig(responseRinsingState.status, "для промывочных состояний")
    );
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = (type, currentData, nameActionBtn) => {
    setIsOpenModal(true);
    setTypeModal(type);
    setCurrentData(currentData);
    setNameAction(nameActionBtn);
  };

  const addDataInTable = async () => {
    setIsLoading(true);

    const { PATH, METHOD, HEADERS } = API_CONFIG[nameAction](installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, currentData, HEADERS);
    // debugger;
    setNotification(
      getNotificationConfig((status === "success" || status === "update") ? "update" : "error")
    );

    await loadDataPage();

    setIsLoading(false);
  };

  const changeDataTableStartState = ({ target }, nameFieldObject) => {
    const { name, value } = target;

    setDataStartState((prev) => ({
      ...prev,
      [nameFieldObject]: { ...dataStartState[nameFieldObject], [name]: Number(value) },
    }));
  };

  const changeDataTableRinsingState = ({ target }) => {
    const { name, value } = target;

    setDataRinsingState((prev) => ({ ...prev, [name]: Number(value) }));
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
              <fieldset>
                <legend>Параметры вычисления стартовых состояний:</legend>
                <div>
                  <table className="table-data">
                    <tbody>
                      <tr>
                        <th colSpan={2}>
                          <label>Не учитываемый временной интервал после старта</label>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <label>Пропустить дней:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="skipDays"
                            onChange={(event) =>
                              changeDataTableStartState(event, "startStateParam")
                            }
                            placeholder={dataStartState?.startStateParam?.skipDays ?? "-"}
                          />
                        </th>
                        <th>
                          <label>Пропустить не менее:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="skipHours"
                            onChange={(event) =>
                              changeDataTableStartState(event, "startStateParam")
                            }
                            placeholder={dataStartState?.startStateParam?.skipHours ?? "-"}
                          />
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table className="table-data">
                    <tbody>
                      <tr>
                        <th colSpan={2}>
                          <label>Расчетный временной интервал</label>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <label>Включить дней:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="daysCounter"
                            onChange={(event) =>
                              changeDataTableStartState(event, "startStateParam")
                            }
                            placeholder={dataStartState?.startStateParam?.daysCounter ?? "-"}
                          />
                        </th>
                        <th>
                          <label>Включить не менее:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="hoursCounter"
                            onChange={(event) =>
                              changeDataTableStartState(event, "startStateParam")
                            }
                            placeholder={dataStartState?.startStateParam?.hoursCounter ?? "-"}
                          />
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </fieldset>
              <fieldset>
                <legend>Параметры вычисления нулевых состояний:</legend>
                <div>
                  <table className="table-data">
                    <tbody>
                      <tr>
                        <th colSpan={2}>
                          <label>Не учитываемый временной интервал после старта</label>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <label>Пропустить дней:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="skipDays"
                            onChange={(event) =>
                              changeDataTableStartState(event, "zeroStatesParam")
                            }
                            placeholder={dataStartState?.zeroStatesParam?.skipDays ?? "-"}
                          />
                        </th>
                        <th>
                          <label>Пропустить не менее:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="skipHours"
                            onChange={(event) =>
                              changeDataTableStartState(event, "zeroStatesParam")
                            }
                            placeholder={dataStartState?.zeroStatesParam?.skipHours ?? "-"}
                          />
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table className="table-data">
                    <tbody>
                      <tr>
                        <th colSpan={2}>
                          <label>Расчетный временной интервал</label>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <label>Включить дней:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="daysCounter"
                            onChange={(event) =>
                              changeDataTableStartState(event, "zeroStatesParam")
                            }
                            placeholder={dataStartState?.zeroStatesParam?.daysCounter ?? "-"}
                          />
                        </th>
                        <th>
                          <label>Включить не менее:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="hoursCounter"
                            onChange={(event) =>
                              changeDataTableStartState(event, "zeroStatesParam")
                            }
                            placeholder={dataStartState?.zeroStatesParam?.hoursCounter ?? "-"}
                          />
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </fieldset>
              <fieldset>
                <legend>Параметры вычисления рабочих состояний:</legend>
                <div>
                  <table className="table-data">
                    <tbody>
                      <tr>
                        <th colSpan={4}>
                          <label>Рабочие параметры </label>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <label>Не менее DeletaP2:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="deltaP2"
                            onChange={(event) =>
                              changeDataTableStartState(event, "workingDaylyParam")
                            }
                            placeholder={dataStartState?.workingDaylyParam?.deltaP2 ?? "-"}
                          />
                        </th>
                        <th>
                          <label>Не менее P3:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="p3"
                            onChange={(event) =>
                              changeDataTableStartState(event, "workingDaylyParam")
                            }
                            placeholder={dataStartState?.workingDaylyParam?.p3 ?? "-"}
                          />
                        </th>
                        <th>
                          <label>Не более Qd:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="drain"
                            onChange={(event) =>
                              changeDataTableStartState(event, "workingDaylyParam")
                            }
                            placeholder={dataStartState?.workingDaylyParam?.drain ?? "-"}
                          />
                        </th>
                        <th>
                          <label>Количество повторений:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="counter"
                            onChange={(event) =>
                              changeDataTableStartState(event, "workingDaylyParam")
                            }
                            placeholder={dataStartState?.workingDaylyParam?.counter ?? "-"}
                          />
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </fieldset>
              <fieldset>
                <legend>Параметры вычисления интервальных состояний:</legend>
                <div>
                  <table className="table-data">
                    <tbody>
                      <tr>
                        <th style={{ width: "50%" }}>
                          <label className="normalization-item__title">
                            Средние значения интервалов
                          </label>
                        </th>
                        <td>
                          <label>Интервал:</label>
                          <input
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="counter"
                            onChange={(event) =>
                              changeDataTableStartState(event, "mediumIntDaylyParam")
                            }
                            placeholder={dataStartState?.mediumIntDaylyParam?.counter ?? "-"}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </fieldset>
              <div className="table-data">
                <input
                  type="button"
                  className="submit"
                  onClick={() => openModal("ADD", dataStartState, "updateSettings")}
                  value="Сохранить"
                />
              </div>
            </fieldset>
          </form>
          <form className="section-title" style={{ marginTop: "50px" }}>
            <fieldset>
              <fieldset>
                <legend>Параметры вычисления промывочных состояний:</legend>
                <div>
                  <table className="table-data">
                    <tbody>
                      <tr>
                        <td>
                          <label>Не более P3:</label>
                          <input
                            className="input-rising__params"
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="p3"
                            onChange={changeDataTableRinsingState}
                            placeholder={dataRinsingState?.p3 ?? "-"}
                          />
                        </td>
                        <td>
                          <label>Не менее Qd:</label>
                          <input
                            className="input-rising__params"
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="drain"
                            onChange={changeDataTableRinsingState}
                            placeholder={dataRinsingState?.drain ?? "-"}
                          />
                        </td>
                        <td>
                          <label>Количество повторений:</label>
                          <input
                            className="input-rising__params"
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="counter"
                            onChange={changeDataTableRinsingState}
                            placeholder={dataRinsingState?.counter ?? "-"}
                          />
                        </td>
                        <td>
                          <label>Временной интервал рассчета:</label>
                          <input
                            className="input-rising__params"
                            type="number"
                            style={{
                              marginLeft: "10px",
                              width: 100,
                            }}
                            name="deltaTime"
                            onChange={changeDataTableRinsingState}
                            placeholder={dataRinsingState?.deltaTime ?? "-"}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </fieldset>
              <div className="table-data">
                <input
                  type="button"
                  className="submit"
                  onClick={() => openModal("ADD", dataRinsingState, "updateRinsingParams")}
                  value="Сохранить"
                />
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
}
