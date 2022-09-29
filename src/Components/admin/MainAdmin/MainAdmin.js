import Grow from "@material-ui/core/Grow";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader } from "../../../helpers";
import { httpService } from "../../../services";
import { AddCompany, MainTable } from "./components/";

export function MainAdmin() {
  document.title = "Страница администратора";
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let cleanupFunction = false;
    loadDataPage(cleanupFunction);
    return () => (cleanupFunction = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDataPage = async (cleanupFunction) => {
    setIsLoading(true);

    const { PATH } = API_CONFIG.getAllCompanies();
    const response = await httpService.sendRequest(PATH);

    if (!cleanupFunction) {
      setIsLoading(false);
      setDataTable(response?.data ?? []);

      showAlert(getNotificationConfig(response.status, "для таблицы"));
    }
  };

  const showAlert = (notification) => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <Box sx={{ width: "90%", m: "40px auto" }}>
          <AddCompany showAlert={showAlert} loadDataPage={loadDataPage} />
          <MainTable dataTable={dataTable} showAlert={showAlert} loadDataPage={loadDataPage} />
        </Box>
      )}
    </>
  );
}
