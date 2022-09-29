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
import { getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";
import { DATA_FOR_ADD } from "./constant";

export const INITIAL_PERIOD = {
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
  endDate: new Date().toISOString(),
};

export function RemoteView() {
  const { installationId } = useParams();
  document.title = "Изменение режима работы";

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [period, setPeriod] = useState(INITIAL_PERIOD);

  const [dataTable, setDataTable] = useState([]);
  const [dataMainTable, setDataMainTable] = useState(DATA_FOR_ADD);
  const [typeModal, setTypeModal] = useState("ADD");
  const [idRowTable, setIdRowTable] = useState();

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
    const responseAllDates = await httpService.sendRequest(
      API_CONFIG.getRemoteViewEvents(installationId).PATH
    );
    const getApiForPeriod = API_CONFIG.getAnalyzePeriod(installationId).PATH;

    const responsePeriod = await httpService.sendRequest(getApiForPeriod);

    const { startDate, endDate } =
      responsePeriod.status === "empty" ||
      responsePeriod.status === "error" ||
      responsePeriod?.data?.startDate === ""
        ? INITIAL_PERIOD
        : responsePeriod?.data;
    setDataMainTable((prev) => ({
      ...prev,
      date: format(new Date(endDate), "yyyy-MM-dd'T'HH:mm"),
    }));
    setPeriod({ startDate, endDate });
    setDataTable(responseAllDates?.data ?? []);
    setNotification(getNotificationConfig(responseAllDates.status, "для таблицы дат"));
  };

  const addDataFilter = async () => {
    setIsLoading(true);
    let formData = new FormData();

    formData.append("date", new Date(dataMainTable.date).toISOString());

    const { PATH, METHOD } = API_CONFIG.addRemoteViewEvent(installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, formData);

    setNotification(getNotificationConfig(status));

    await loadDataPage();

    setIsLoading(false);
  };

  const saveDataFilter = async () => {
    setIsLoading(true);
    const tempData = {
      ...dataTable[idRowTable],
      date: new Date(dataTable[idRowTable].date).toISOString(),
    };

    let formData = new FormData();

    Object.keys(tempData).forEach((element) => {
      formData.append(element, tempData[element]);
    });

    const { PATH, METHOD } = API_CONFIG.updateEvent(installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, formData);

    setNotification(getNotificationConfig(status));

    await loadDataPage();
    setIsLoading(false);
  };

  const deleteDataFilter = async () => {
    setIsLoading(true);
    const { PATH, METHOD } = API_CONFIG.deleteEvent(installationId);
    let formData = new FormData();

    Object.keys(dataTable[idRowTable]).forEach((element) => {
      formData.append(element, dataTable[idRowTable][element]);
    });

    const { status } = await httpService.sendRequest(PATH, METHOD, formData);
    setNotification(getNotificationConfig(status));

    await loadDataPage(period);

    setIsLoading(false);
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
        return addDataFilter();
      case "SAVE":
        return saveDataFilter();
      case "DELETE":
        return deleteDataFilter();

      default:
        break;
    }
  };

  const changeDateMainTable = ({ target }) => {
    setDataMainTable((prev) => ({ ...prev, date: target.value }));
  };

  const changeDateTable = ({ target }) => {
    const { value, id } = target;

    dataTable[Number(id)].date = value;
    setDataTable([...dataTable]);
  };

  function RowTable({ date, id, index }) {
    return (
      <tr>
        <th style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DeleteForeverIcon
              onClick={() => openModal("DELETE", index)}
              id={id}
              name="DELETE"
              sx={{ cursor: "pointer", color: "blue", mr: 2 }}
            />
            <input
              id={index}
              defaultValue={format(new Date(date), "yyyy-MM-dd'T'HH:mm")}
              type="datetime-local"
              min={format(new Date(period?.startDate), "yyyy-MM-dd'T'HH:mm")}
              max={format(new Date(period?.endDate), "yyyy-MM-dd'T'HH:mm")}
              style={{ textAlign: "center" }}
              onChange={changeDateTable}
            />

            <SaveIcon
              onClick={() => openModal("SAVE", index)}
              id={id}
              name="SAVE"
              sx={{ cursor: "pointer", color: "green", ml: 2 }}
            />
          </div>
        </th>
      </tr>
    );
  }

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
          <form className="section-title">
            <fieldset>
              <legend>Изменение режима работы</legend>
              <table className="table-data">
                <tbody>
                  <tr>
                    <th style={{ width: "100%" }}>Дата</th>
                  </tr>
                  <tr>
                    <td className="date-wash-wrap" style={{ width: "100%", height: 80 }}>
                      <input
                        type="datetime-local"
                        name="calendar"
                        value={dataMainTable.date}
                        min={format(new Date(period?.startDate), "yyyy-MM-dd'T'HH:mm")}
                        max={format(new Date(period?.endDate), "yyyy-MM-dd'T'HH:mm")}
                        onChange={changeDateMainTable}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="5">
                      <input
                        type="button"
                        defaultValue="Добавить"
                        className="submit"
                        onClick={() => openModal("ADD")}
                      />
                    </th>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th style={{ width: "100%" }}>Дата</th>
                </tr>

                {dataTable?.map((item, index) => {
                  return <RowTable date={item.date} id={item.id} index={index} key={item.id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
