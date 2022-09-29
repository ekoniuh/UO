/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";

// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";
import { DATA_FOR_ADD } from "./constant";

export function MembraneChanged() {
  const { installationId } = useParams();
  document.title = "Старт установки/замена мембран";

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

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
      API_CONFIG.getMembraneChangedEvents(installationId).PATH
    );

    setDataTable(responseAllDates?.data ?? []);
    setNotification(getNotificationConfig(responseAllDates.status, "для таблицы дат"));
  };

  const addDataMembrane = async () => {
    setIsLoading(true);
    // const tempData = { ...dataMainTable, date: new Date(dataMainTable.date).toISOString() };
    let formData = new FormData();

    // Object.keys(tempData).forEach((element) => {
    //   formData.append(element, tempData[element]);
    // });

    formData.append("date", new Date(dataMainTable.date).toISOString());

    const { PATH, METHOD } = API_CONFIG.addMembraneChangedEvent(installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, formData);

    setNotification(getNotificationConfig(status));

    await loadDataPage();

    setIsLoading(false);
  };

  const saveDataMembrane = async () => {
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
        return addDataMembrane();
      case "SAVE":
        return saveDataMembrane();

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
            <input
              id={index}
              defaultValue={format(new Date(date), "yyyy-MM-dd'T'hh:mm")}
              type="datetime-local"
              max={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
              // min={format(new Date(period?.startDate), "yyyy-MM-dd'T'HH:mm")}
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
              <legend>Старт установки/замена мембран</legend>
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
                        max={format(new Date(), "yyyy-MM-dd'T'hh:mm")}
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
