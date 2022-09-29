/* eslint-disable react-hooks/exhaustive-deps */
import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_CONFIG as api } from "../../../constants/";
import { getNotificationConfig } from "../../../helpers";
import { httpService } from "../../../services";
import "./styleCurrentState.css";
import { Pressure, Streams, Temperature } from "./Tables";
import { Loader } from "./Loader";

const initialData = {
  tempWater: "-",
  conductivityPerm: "-",
  p1: "-",
  p2: "-",
  deltaP1: "-",
  p3: "-",
  p4: "-",
  deltaP2: "-",
  ratePerm: "-",
  drain: "-",
  circulation: "-",
};

export function CurrentParametersInstallation() {
  document.title = "Текущие значения";
  const { installationId } = useParams();
  const [dataTable, setDataTable] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const { PATH } = api.getCurrentState(installationId);

  useEffect(async () => {
    await loadDataPage();
  }, [installationId]);

  useEffect(() => {
    const timeoutId = setInterval(async () => {
      await loadDataPage();
    }, 10000);
    return () => {
      clearInterval(timeoutId);
    };
  }, []);

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

    setDataTable(response?.data ?? initialData);
    setNotification(getNotificationConfig(response.status));

    setIsLoading(false);
  };

  const {
    tempWater,
    conductivityPerm,
    p1,
    p2,
    deltaP1,
    p3,
    p4,
    deltaP2,
    ratePerm,
    drain,
    circulation,
  } = dataTable;

  return (
    <div className="current-state-wrap">
      <div style={{ height: "6vh" }}>
        <Loader isLoading={isLoading} />
      </div>

      <Temperature tempWater={tempWater} conductivityPerm={conductivityPerm} />
      <Pressure
        predFilter1={p1}
        predFilter2={p2}
        p3={p3}
        p4={p4}
        deltaP1={deltaP1}
        deltaP2={deltaP2}
      />
      <Streams ratePerm={ratePerm} drain={drain} circulation={circulation} />
    </div>
  );
}
