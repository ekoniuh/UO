/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";

import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader } from "../../../helpers";
import { httpService } from "../../../services";
import { Table } from "./components";
import { INITIAL_DATA_TABLE_SERVICE } from "./constant";

export function Service() {
  const { installationId } = useParams();
  document.title = "Сервисы";
  const [dataService, setDataService] = useState(INITIAL_DATA_TABLE_SERVICE);

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    loadDataPage();
    setIsLoading(false);
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
    const { PATH } = API_CONFIG.getService(installationId);
    const response = await httpService.sendRequest(PATH);

    setDataService(response?.data ?? INITIAL_DATA_TABLE_SERVICE);

    setNotification(getNotificationConfig(response.status, "для Сервисов"));
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="container">
          <form className="section-title">
            <fieldset>
              <legend>Сервис</legend>
              <Table data={dataService} />
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
}
