/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";

import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";
import { CONFIG_TBODY ,  INITIAL_DATA_TABLE } from "./constant";


export function AutoNormalization() {
  const { installationId } = useParams();
  document.title = "Авто нормализация";

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
    const response = await httpService.sendRequest(API_CONFIG.single(installationId).PATH);

    setDataTable(response?.data ?? INITIAL_DATA_TABLE);
    setNotification(getNotificationConfig(response.status, "для авто-нормализации"));
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

    const { PATH, METHOD, HEADERS } = API_CONFIG.updateInstallation(installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, dataTable, HEADERS);
    setNotification(getNotificationConfig(status === "success" ? "update" : "error"));

    await loadDataPage();

    setIsLoading(false);
  };

  const changeDataTable = ({ target }) => {
    const { name, value } = target;

    setDataTable((prev) => ({ ...prev, [name]: Number(value) }));
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
            <fieldset
            //  disabled={!dataTable}
            >
              <legend>Параметры авто нормализации:</legend>
              <table className="table-data">
                <tbody>
                  {CONFIG_TBODY.map(([title, nameValue]) => {
                    console.log("dataTable[nameValue]", dataTable[nameValue]);
                    return (
                      <tr key={nameValue}>
                        <th style={{ width: "50%", fontSize: 14, textAlign: "center" }}>
                          <label className="normalization-item__title">{title}</label>
                        </th>
                        <td>
                          <input
                            type="number"
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
        </div>
      )}
    </>
  );
}
