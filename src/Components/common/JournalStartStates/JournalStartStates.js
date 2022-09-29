/* eslint-disable react-hooks/exhaustive-deps */
// import './styleNormalization.css';
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";

import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";
import { Table, TitlePage } from "./components";
import { INITIAL_DATA_FOR_ADD, TITLE_TABLE } from "./constant";

import "./placeholderStyle.css";

export function JournalStartStates() {
  const { installationId } = useParams();
  document.title = "Журнал стартовых параметров";

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEmptyDateInputWashing, setIsEmptyDateInputWashing] = useState(false);
  const [isEmptyDateInputReplacing, setIsEmptyDateInputReplacing] = useState(false);

  const [dataReplacingMembrane, setDataReplacingMembrane] = useState([]);
  const [dataWashingMembrane, setDataWashingMembrane] = useState([]);
  const [typeModal, setTypeModal] = useState("ADD");
  const [idRowTable, setIdRowTable] = useState();
  const [nameAction, setNameAction] = useState();
  const [currentData, setCurrentData] = useState();
  const [dataForAddInTableReplacing, setDataForAddInTableReplacing] =
    useState(INITIAL_DATA_FOR_ADD);
  const [dataForAddInTableWashing, setDataForAddInTableWashing] = useState(INITIAL_DATA_FOR_ADD);
  const [dataForUpdateWashing, setDataForUpdateWashing] = useState(INITIAL_DATA_FOR_ADD);
  const [dataForUpdateReplacing, setDataForUpdateReplacing] = useState(INITIAL_DATA_FOR_ADD);

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
    const responseReplacingMembrane = await httpService.sendRequest(
      API_CONFIG.getAllStartStates(installationId).PATH
    );
    const responseWashingMembrane = await httpService.sendRequest(
      API_CONFIG.getAllZeroStates(installationId).PATH
    );

    setDataReplacingMembrane(responseReplacingMembrane?.data ?? []);
    setDataWashingMembrane(responseWashingMembrane?.data ?? []);
    setDataForAddInTableReplacing(INITIAL_DATA_FOR_ADD);
    setDataForAddInTableWashing(INITIAL_DATA_FOR_ADD);

    if (responseWashingMembrane.status === "success") {
      setDataForUpdateWashing(responseWashingMembrane?.data[0]);
    }

    if (responseReplacingMembrane.status === "success") {
      setDataForUpdateReplacing(responseReplacingMembrane?.data[0]);
    }

    setNotification(
      getNotificationConfig(responseReplacingMembrane.status, "для значений после замены мембран")
    );
    setNotification(
      getNotificationConfig(responseWashingMembrane.status, "для значений после промывки мембран")
    );
  };

  const getMinAndMaxDate = (dataState) => {
    if (!dataState.length)
      return {
        maxDate: format(new Date(), "yyyy-MM-dd"),

        minDate: format(new Date().setFullYear(new Date().getFullYear() - 1), "yyyy-MM-dd"),
      };
    // const minDate = Math.min(...dataState.map((item) => Date.parse(item.date)));
    const maxDate = Math.max(...dataState.map((item) => Date.parse(item.date)));

    return {
      maxDate: format(new Date(maxDate), "yyyy-MM-dd"),

      minDate: format(new Date().setFullYear(new Date().getFullYear() - 1), "yyyy-MM-dd"),
    };
  };

  const addDataForTable = async () => {
    setIsLoading(true);

    const { PATH, METHOD, HEADERS } = API_CONFIG[nameAction](installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, currentData, HEADERS);
    setNotification(getNotificationConfig(status));

    await loadDataPage();
    setIsLoading(false);
  };

  const saveDataForTable = async () => {
    setIsLoading(true);

    const { PATH, METHOD, HEADERS } = API_CONFIG[nameAction](installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, currentData, HEADERS);
    setNotification(getNotificationConfig(status));

    await loadDataPage();
    setIsLoading(false);
  };

  const deleteDataForTable = async () => {
    setIsLoading(true);
    const { PATH } = API_CONFIG[nameAction](idRowTable);

    const { status } = await httpService.sendRequest(PATH);

    const statusClear = status === "empty" ? "clear" : "error";

    setNotification(getNotificationConfig(statusClear));

    await loadDataPage();
    setIsLoading(false);
  };

  const changeDataForUpdateReplacing = ({ target }) => {
    const { value, name, type } = target;
    setDataForUpdateReplacing((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const changeDataForUpdateWashing = ({ target }) => {
    const { value, name, type } = target;
    setDataForUpdateWashing((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const changeDataForAddWashingMembrane = ({ target }) => {
    const { value, name, type } = target;
    const correctValue =
      type === "number"
        ? Number(value)
        : new Date(new Date(value).setMinutes(new Date(value).getMinutes() + 4)).toISOString();

    if (type === "date") {
      setIsEmptyDateInputWashing(false);
    }

    setDataForAddInTableWashing((prev) => ({
      ...prev,
      [name]: correctValue,
    }));
  };

  const changeDataForAddReplacingMembrane = ({ target }) => {
    const { value, name, type } = target;
    const correctValue =
      type === "number"
        ? Number(value)
        : new Date(new Date(value).setMinutes(new Date(value).getMinutes() + 4)).toISOString();

    if (type === "date") {
      setIsEmptyDateInputReplacing(false);
    }

    setDataForAddInTableReplacing((prev) => ({
      ...prev,
      [name]: correctValue,
    }));
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = (type, currentData, id = "", nameActionBtn) => {
    if (type === "ADD" && !currentData.date) {
      if (nameActionBtn === "addStartState") {
        setIsEmptyDateInputReplacing(true);
        setIsEmptyDateInputWashing(false);
        return;
      } else {
        setIsEmptyDateInputWashing(true);
        setIsEmptyDateInputReplacing(false);
        return;
      }
    }
    setIsEmptyDateInputReplacing(false);
    setIsEmptyDateInputWashing(false);
    setIsOpenModal(true);
    setTypeModal(type);
    setIdRowTable(Number(id));
    setCurrentData(currentData);
    setNameAction(nameActionBtn);
  };

  const selectAction = () => {
    switch (typeModal) {
      case "ADD":
        return addDataForTable();
      case "SAVE":
        return saveDataForTable();
      case "DELETE":
        return deleteDataForTable();
      default:
        break;
    }
  };

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

          <TitlePage />

          <Table
            changeDataForAdd={changeDataForAddReplacingMembrane}
            changeDataForSave={changeDataForUpdateReplacing}
            objectForAdd={dataForAddInTableReplacing}
            objectForSave={dataForUpdateReplacing}
            openModal={openModal}
            actionDelete={"deleteStartState"}
            actionSave={"updateStartState"}
            actionAdd={"addStartState"}
            getMinAndMaxDate={getMinAndMaxDate}
            key={"dataReplacingMembrane"}
            data={dataReplacingMembrane}
            isEmptyDateInput={isEmptyDateInputReplacing}
            title={TITLE_TABLE.replacingMembrane}
          />
          <Table
            changeDataForAdd={changeDataForAddWashingMembrane}
            changeDataForSave={changeDataForUpdateWashing}
            objectForAdd={dataForAddInTableWashing}
            objectForSave={dataForUpdateWashing}
            openModal={openModal}
            actionDelete={"deleteZeroState"}
            actionSave={"updateZeroState"}
            actionAdd={"addZeroState"}
            getMinAndMaxDate={getMinAndMaxDate}
            key={"dataWashingMembrane"}
            data={dataWashingMembrane}
            isEmptyDateInput={isEmptyDateInputWashing}
            title={TITLE_TABLE.washingMembrane}
          />
        </div>
      )}
    </>
  );
}
