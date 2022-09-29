/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-hooks/exhaustive-deps
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getDataChart } from "../JournalParameters/helpers/getDataChart";
// import {
//   DayStateVirtualizedTable,
//   RinsingStateVirtualizedTable,
//   WorkingStateVirtualizedTable,
// } from "./components/";

import Grow from "@material-ui/core/Grow";
import { format } from "date-fns";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSnackbar } from "notistack";
import { API_CONFIG } from "../../../constants";
import { DatePicker, getNotificationConfig, Loader } from "../../../helpers/";
import { httpService } from "../../../services/";
import { AccordionWithMessages as Accordion } from "./components/";
import { TextField } from "@mui/material";

const changeFormatDate = (data) => {
  if (!(data && data.length > 0)) {
    return [];
  }

  data.forEach((item) => (item.date = format(new Date(item.date), "HH:mm")));

  return data;
};

export function Messages() {
  document.title = "Архив";
  const { installationId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    loadDataPage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDataPage = async () => {
    setIsLoading(true);

    const { PATH } = API_CONFIG.getInstallationMessages(installationId);
    const response = await httpService.sendRequest(PATH);

    setIsLoading(false);
    setDataTable(response?.data ?? []);

    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        
        <Accordion dataMessages={dataTable} installationId={installationId} />
      )}
    </>
  );
}
