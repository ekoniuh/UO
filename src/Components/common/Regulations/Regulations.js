/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";

import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";
import { TableMembrane } from "./components";
import {
  CONFIG_TBODY_MEMBRANE,
  CONFIG_TBODY_MEMBRANE_WASH,
  TITLE_MEMBRANE,
  TITLE_MEMBRANE_WASH,
  INITIAL_DATA_TABLE_MEMBRANE,
  INITIAL_DATA_TABLE_MEMBRANE_WASH,
  TITLE_SERVICE,
  CONFIG_TBODY_SERVICE,
  INITIAL_DATA_TABLE_SERVICE,
} from "./constant";

export function Regulations() {
  const { installationId } = useParams();
  document.title = "Регламент";
  const [dataMembrane, setDataMembrane] = useState(INITIAL_DATA_TABLE_MEMBRANE);
  const [dataMembraneWash, setDataMembraneWash] = useState(INITIAL_DATA_TABLE_MEMBRANE_WASH);
  const [dataService, setDataService] = useState(INITIAL_DATA_TABLE_SERVICE);
  const [currentData, setCurrentData] = useState();
  const [nameAction, setNameAction] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("ADD");

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
    const responseMembrane = await httpService.sendRequest(
      API_CONFIG.getMembraneParams(installationId).PATH
    );
    const responseMembraneWash = await httpService.sendRequest(
      API_CONFIG.getMembraneWashParams(installationId).PATH
    );
    const responseServiceForRegulation = await httpService.sendRequest(
      API_CONFIG.getDataServiceForRegulation(installationId).PATH
    );

    setDataMembrane(responseMembrane?.data ?? INITIAL_DATA_TABLE_MEMBRANE);
    setDataMembraneWash(responseMembraneWash?.data ?? INITIAL_DATA_TABLE_MEMBRANE_WASH);
    setDataService(responseServiceForRegulation?.data ?? INITIAL_DATA_TABLE_SERVICE);

    setNotification(getNotificationConfig(responseMembrane.status, "для Мембран"));
    setNotification(
      getNotificationConfig(responseMembraneWash.status, "для Химических промывок мембран")
    );
    setNotification(getNotificationConfig(responseServiceForRegulation.status, "для Cервиса"));
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = (type, currentData, nameActionBtn) => {
    setIsOpenModal(true);
    setTypeModal(type);
    setCurrentData(currentData);
    setNameAction(nameActionBtn);
  };

  const addDataInTable = async () => {
    setIsLoading(true);

    const { PATH, METHOD, HEADERS } = API_CONFIG[nameAction](installationId);
    const data =
      nameAction === "updateDataServiceForRegulation" ? currentData.viewInterval : currentData;
    const { status } = await httpService.sendRequest(PATH, METHOD, data, HEADERS);
    setNotification(getNotificationConfig(status));

    await loadDataPage();

    setIsLoading(false);
  };

  const changeDataTableMembrane = ({ target }) => {
    const { name, value } = target;

    setDataMembrane((prev) => ({ ...prev, [name]: name === "producer" ? value : Number(value) }));
  };

  const changeDataTableMembraneWash = ({ target }) => {
    const { name, value } = target;

    setDataMembraneWash((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const changeDataTableService = ({ target }) => {
    const { name } = target;

    setDataService((prev) => ({ ...prev, [name]: Number((target.value |= 0)) }));
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
          <TableMembrane
            dataTable={dataMembrane}
            changeDataTable={changeDataTableMembrane}
            openModal={openModal}
            configTable={CONFIG_TBODY_MEMBRANE}
            title={TITLE_MEMBRANE}
            actionAdd={"updateMembraneParams"}
          />
          <TableMembrane
            dataTable={dataMembraneWash}
            changeDataTable={changeDataTableMembraneWash}
            openModal={openModal}
            configTable={CONFIG_TBODY_MEMBRANE_WASH}
            title={TITLE_MEMBRANE_WASH}
            actionAdd={"updateMembraneWashParams"}
          />
          <TableMembrane
            dataTable={dataService}
            changeDataTable={changeDataTableService}
            openModal={openModal}
            configTable={CONFIG_TBODY_SERVICE}
            title={TITLE_SERVICE}
            actionAdd={"updateDataServiceForRegulation"}
          />
        </div>
      )}
    </>
  );
}
