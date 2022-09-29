/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Grow from "@material-ui/core/Grow";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import { Context } from "../../../";
import { API_CONFIG, CONFIG_JOURNAL_EVENTS } from "../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";
import "./styleJournalEvents.css";

export function JournalEvents() {
  const { installationId } = useParams();
  document.title = "Журнал событий";
  const { store } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [clickClearEvents, setClickClearEvents] = useState(false);

  const [typeModal, setTypeModal] = useState("ADD");

  const clearCurrentMonitoringAPI = API_CONFIG.clearCurrentMonitoring(installationId);

  useEffect(() => {
    loadDataPage();
  }, [installationId]);

  const loadDataPage = async () => {
    setIsLoading(true);
    let urls = [
      `LastMembranWashEvent`,
      `GetLastMembranChangedEvent`,
      `GetLastFilterChanged`,
      `GetLastWorkTypeChangedEvent`,
      `GetLastRemoteViewEvent`,
    ];

    let requests = urls.map((url) =>
      httpService.sendRequest(`/installation/${installationId}/${url}`)
    );

    await Promise.all(requests).then((resolve) => {
      resolve.forEach((request) => {
        // console.log('request', request?.data)
        // const event = CONFIG_JOURNAL_EVENTS.find(
        //   (item) => request?.data?.type === item.name
        // )[0];
        // console.log("event", event);
        if (request.status === "success") {
          const event = CONFIG_JOURNAL_EVENTS.find((item) => request?.data?.type === item.name);
          event.date = request.data?.date
            ? format(new Date(request.data?.date), "dd.MM.yyyy")
            : "-";
        } else {
          // event.date = "-";
          setNotification(getNotificationConfig(request.status));
        }
      });
    });

    setIsLoading(false);
  };

  useEffect(() => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  async function clearDataEvents() {
    const { PATH, METHOD, HEADERS } = clearCurrentMonitoringAPI;
    const { status } = await httpService.sendRequest(PATH, METHOD, HEADERS);
    setNotification(getNotificationConfig(status));
    loadDataPage();
  }

  const closeModal = () => {
    setClickClearEvents(false);
  };

  const openModal = ({ target }) => {
    setTypeModal(target.name);
    setClickClearEvents(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div style={{ width: "95%", align: "center", margin: "100px auto" }}>
          <Modal
            isClickOpenModal={clickClearEvents}
            actionSuccess={clearDataEvents}
            closeModal={closeModal}
            typeModal={typeModal}
          />
          <h2 className="section-title">Журнал событий:</h2>
          <table className="table-data" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th style={{ width: "85%" }}>Событие</th>
                <th style={{ width: "85%" }}>Дата</th>
              </tr>
              {CONFIG_JOURNAL_EVENTS.map((row, ndx) => {
                return (
                  <tr key={ndx}>
                    <td style={{ width: "85%" }}>
                      <Link
                        onClick={() => {
                          document.title = `${row.title}`;
                        }}
                        to={{
                          pathname: `/${store.user?.role.toLowerCase()}/installation/${installationId}/events/${
                            row.pathname
                          }`,
                        }}
                        underline="always"
                        // sx={{color:"green"}}
                      >
                        <button type="button" className="events__btn">
                          {row.title}
                        </button>
                      </Link>
                    </td>
                    <td style={{ fontSize: 14 }} className="date-event">
                      {row.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <table className="table-data">
            <tbody>
              <tr>
                <th>
                  <input
                    type="button"
                    className="submit"
                    name="ADD"
                    onClick={openModal}
                    value="Очистить"
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
