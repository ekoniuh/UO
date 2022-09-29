/* eslint-disable react-hooks/exhaustive-deps */
import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_CONFIG } from "../../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../../helpers/";
import { httpService } from "../../../../services";
import { INITIAL_DATA_TABLE_PUMP as INITIAL_DATA_TABLE } from "./constant";

export function Pump() {
  const { installationId } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("ADD");

  const [dataTable, setDataTable] = useState(INITIAL_DATA_TABLE);

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
    const response = await httpService.sendRequest(API_CONFIG.getPumpParams(installationId).PATH);

    setDataTable(response?.data ?? INITIAL_DATA_TABLE);
    setNotification(getNotificationConfig(response.status, "для таблицы насос"));
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

    const { PATH, METHOD, HEADERS } = API_CONFIG.updatePumpParams(installationId);
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
              <legend>Насос:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th>Производитель</th>
                      <th>Модель</th>
                      <th>Рабочая точка, P(бар)/Q(м3/ч)</th>
                      <th>Частотный преобразователь</th>
                      <th>КПД</th>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="producer"
                          placeholder={dataTable?.producer ?? "-"}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="model"
                          placeholder={dataTable?.model ?? "-"}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="workingPoint"
                          placeholder={dataTable?.workingPoint ?? "-"}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="convertor"
                          placeholder={dataTable?.convertor ?? "-"}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="efficiency"
                          placeholder={dataTable?.efficiency ?? "-"}
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
