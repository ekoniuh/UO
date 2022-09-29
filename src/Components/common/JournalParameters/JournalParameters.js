/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./JournalParameters.css";

import { MiddleStatesHeader } from "./components/MiddleStatesHeader";
import { THead } from "./components/THead";
import { ReactVirtualizedTable } from "./components/VirtualizedTable";
import { getDataChart } from "./helpers/getDataChart";

import Grow from "@material-ui/core/Grow";
import { format } from "date-fns";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSnackbar } from "notistack";
import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader } from "../../../helpers";
import { httpService } from "../../../services";

export function JournalParameters() {
  document.title = "Журнал средних значений";
  const { installationId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [optionsForChart, setOptionsForChart] = useState([]);
  const [dataPage, setDataPage] = useState([]);
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isClickNormalizationBtn, setIsClickNormalizationBtn] = useState(false);

  const { PATH } = API_CONFIG.allMiddleStates(installationId);

  useEffect(async () => {
    await loadDataPage();
  }, [installationId, isClickNormalizationBtn]);

  useEffect(() => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 2000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  const loadDataPage = async () => {
    setIsLoading(true);

    const response = await httpService.sendRequest(PATH);
    setDataPage(response?.data ?? []);
    setNotification(getNotificationConfig(response.status));

    if (response.status === "success") {
      response.data.forEach((item) => (item.date = format(new Date(item.date), "dd-MM-yyyy")));
      setOptionsForChart(getDataChart(response.data, isClickNormalizationBtn));
    }
    setIsLoading(false);
  };

  const changeIsNormalization = async () => {
    setIsClickNormalizationBtn(!isClickNormalizationBtn);
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="chart-page-wrapper">
          <MiddleStatesHeader
            isNormalization={isClickNormalizationBtn}
            changeIsNormalization={changeIsNormalization}
          />
          <div style={{ marginBottom: "30px" }}>
            <HighchartsReact highcharts={Highcharts} options={optionsForChart} />
          </div>
          <div className="table-chart-wrapper">
            <THead isDay={true} width={dataPage?.length <= 20 ? "100%" : ""} />
            <ReactVirtualizedTable
              dataState={[...dataPage].reverse()}
              isNormalization={isClickNormalizationBtn}
            />
          </div>
        </div>
      )}
    </>
  );
}
