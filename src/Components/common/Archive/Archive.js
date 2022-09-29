// eslint-disable-next-line react-hooks/exhaustive-deps
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getDataChart } from "../JournalParameters/helpers/getDataChart";
import {
  DayStateVirtualizedTable,
  RinsingStateVirtualizedTable,
  WorkingStateVirtualizedTable,
} from "./components/";

import Grow from "@material-ui/core/Grow";
import { format } from "date-fns";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSnackbar } from "notistack";
import { API_CONFIG } from "../../../constants";
import { DatePicker, getNotificationConfig, Loader } from "../../../helpers/";
import { httpService } from "../../../services/";

const changeFormatDate = (data) => {
  if (!(data && data.length > 0)) {
    return [];
  }

  data.forEach((item) => (item.date = format(new Date(item.date), "HH:mm")));

  return data;
};

export function Archive() {
  document.title = "Архив";
  const { installationId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [optionsForChart, setOptionsForChart] = useState([]);

  const [dataChart, setDataChart] = useState([]);
  const [dataRinsingState, setDataRinsingState] = useState([]);
  const [dataWorkingState, setDataWorkingState] = useState([]);
  const [notification, setNotification] = useState();
  const [activeDate, setActiveDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await loadDataPage();
    })();
  }, [installationId, activeDate]);

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
    const date = format(new Date(activeDate), "yyyy-MM-dd");

    const responseDataChart = await httpService.sendRequest(
      API_CONFIG.getDayStates(installationId, date).PATH
    );
    const responseDataRinsingStates = await httpService.sendRequest(
      API_CONFIG.getRinsingStates(installationId, date).PATH
    );
    const responseWorkingStates = await httpService.sendRequest(
      API_CONFIG.getWorkingStates(installationId, date).PATH
    );

    const correctDatesForChart = changeFormatDate(responseDataChart?.data);

    setOptionsForChart(getDataChart(correctDatesForChart));
    setDataChart(correctDatesForChart);
    setDataRinsingState(changeFormatDate(responseDataRinsingStates?.data));
    setDataWorkingState(changeFormatDate(responseWorkingStates?.data));

    setNotification(getNotificationConfig(responseDataChart.status, "для графика"));
    setNotification(
      getNotificationConfig(responseDataRinsingStates.status, "для промывочных состояний")
    );
    setNotification(getNotificationConfig(responseWorkingStates.status, "для рабочих состояний"));

    setIsLoading(false);
  };

  function handleChangeDate(value) {
    setActiveDate(value);
  }

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="chart-page-wrapper">
          <div className="select-wrap">
            <h2 className="select-title">Состояние установки за :</h2>
            <DatePicker date={activeDate} changeDate={handleChangeDate} />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <HighchartsReact highcharts={Highcharts} options={optionsForChart} />
          </div>
          <DayStateVirtualizedTable dataState={[...dataChart].reverse()} />
          <RinsingStateVirtualizedTable dataState={[...dataRinsingState].reverse()} />
          <WorkingStateVirtualizedTable dataState={[...dataWorkingState].reverse()} />
        </div>
      )}
    </>
  );
}
