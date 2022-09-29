/* eslint-disable react-hooks/exhaustive-deps */
import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_CONFIG } from "../../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../../helpers/";
import { httpService } from "../../../../services";
import { INITIAL_DATA_TABLE_ANTISCALANT as INITIAL_DATA_TABLE } from "./constant";

export function Antiscalant() {
  const { installationId } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("ADD");
  const [isAntiscalant, setIsAntiscalant] = useState(null);

  const [dataTable, setDataTable] = useState(INITIAL_DATA_TABLE);

  useEffect(() => {
    loadDataPage();
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
    setIsLoading(true);

    const response = await httpService.sendRequest(
      API_CONFIG.getAntiscalantParams(installationId).PATH
    );
    setIsLoading(false);
    setDataTable(response?.data ?? INITIAL_DATA_TABLE);
    setIsAntiscalant(response?.data?.isExist ?? null);
    setNotification(getNotificationConfig(response.status, "для таблицы антискалант"));
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = (type) => {
    setTypeModal(type);
    setIsOpenModal(true);
  };

  const addDataInTable = async () => {
    setIsLoading(true);

    const { PATH, METHOD, HEADERS } = API_CONFIG.updateAntiscalantParams(installationId);
    dataTable.isExist = isAntiscalant;
    const { status } = await httpService.sendRequest(PATH, METHOD, dataTable, HEADERS);
    setNotification(getNotificationConfig(status));

    await loadDataPage();

    setIsLoading(false);
  };

  const changeDataTable = ({ target }) => {
    const { name, value, type } = target;

    setDataTable((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          <Modal
            isClickOpenModal={isOpenModal}
            actionSuccess={addDataInTable}
            closeModal={closeModal}
            typeModal={typeModal}
          />
          <form className="section-title">
            <fieldset>
              <legend>Антискалант:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th>Сигнал с установки</th>
                      <th>Дозировка гр/м3</th>
                      <th>Плотность</th>
                      <th>Производитель</th>
                      <th>Наименование</th>
                      <th>Формула</th>
                    </tr>
                    <tr>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="radio"
                              key="isAntiscalantTrue"
                              // disabled={!dataTable?.isExist}
                              checked={isAntiscalant}
                              onChange={() => setIsAntiscalant(!isAntiscalant)}
                            />
                            <span>Да</span>
                          </label>
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="radio"
                              key="isAntiscalantFalse"
                              name="isAntiscalantFalse"
                              // disabled={dataAntiscalant?.isExist}
                              checked={!isAntiscalant}
                              onChange={() => setIsAntiscalant(!isAntiscalant)}
                            />
                            <span>Нет</span>
                          </label>
                        </div>
                      </td>
                      <td>
                        <input
                          type="number"
                          name={"dosage"}
                          disabled={isAntiscalant}
                          placeholder={dataTable?.dosage ?? "-"}
                          onChange={changeDataTable}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          name={"consistence"}
                          disabled={!isAntiscalant}
                          placeholder={dataTable?.consistence ?? "-"}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={"producer"}
                          placeholder={dataTable?.producer ?? "-"}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={"nomination"}
                          placeholder={dataTable?.nomination ?? "-"}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={"formula"}
                          placeholder={dataTable?.formula ?? "-"}
                          onChange={changeDataTable}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 30 }} className="table-data">
                <input
                  type="button"
                  className="submit"
                  onClick={() => openModal("ADD")}
                  value="Сохранить"
                />
              </div>
            </fieldset>
          </form>
        </>
      )}
    </>
  );
}
