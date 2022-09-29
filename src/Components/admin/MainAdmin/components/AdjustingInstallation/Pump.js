/* eslint-disable react-hooks/exhaustive-deps */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Box, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

import React, { useContext, useEffect, useState } from "react";
import { API_CONFIG } from "../../../../../constants";
import { INITIAL_DATA_MODAL_PUMP as INITIAL_DATA_MODAL } from "./constant";
import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { getNotificationConfig, Loader } from "../../../../../helpers";
import { Context } from "../../../../../index";
import { httpService } from "../../../../../services";

export function Pump({
  nextComponent,
  closeModal,
  installationId,
  isLastComponent,
  isFirstComponent,
  showAlert,
}) {
  const [dataModal, setDataModal] = useState(INITIAL_DATA_MODAL);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();
  const [initialLoadData, setInitialLoadData] = useState({});
  const navigate = useNavigate();
  const { store } = useContext(Context);

  useEffect(() => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  const loadDataPump = async () => {
    setIsLoading(true);
    const response = await httpService.sendRequest(API_CONFIG.getPumpParams(installationId).PATH);

    setInitialLoadData(response?.data ?? {});

    setDataModal(response?.data ?? INITIAL_DATA_MODAL);
    showAlert(getNotificationConfig(response.status));
    setIsLoading(false);
  };

  useEffect(() => {
    loadDataPump();

    // const isEmptyField = Object.values(dataModal)
    //   .filter((item) => typeof item === "string")
    //   .every((item) => !item);

    // setIsEmptyFields(!dataModal.name || !dataModal.address);
  }, []);

  const changeDataModal = ({ target }) => {
    const { name, value, type } = target;

    setDataModal((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const addDataInTable = async () => {
    if (JSON.stringify(dataModal) === JSON.stringify(initialLoadData)) {
      nextComponent("next");
      return;
    }

    setIsLoading(true);
    const correctData = {};

    const { PATH, METHOD, HEADERS } = API_CONFIG.updatePumpParams(installationId);

    for (const key in dataModal) {
      if (Object.hasOwnProperty.call(dataModal, key)) {
        const element = dataModal[key];
        correctData[key] = typeof element === "number" && !element ? 0 : element;
      }
    }

    const { status } = await httpService.sendRequest(PATH, METHOD, correctData, HEADERS);
    setNotification(getNotificationConfig(status));

    if (status === "update") {
      nextComponent("next");
    }

    setIsLoading(false);
  };

  const goToPageInstallation = () => {
    closeModal("addInst");
    navigate(`/${store.user?.role.toLowerCase()}/archive/${installationId}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} size={"100px"} lineHeight={"378px"} />
      ) : (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Насос
          </Typography>
          <Stack
            sx={{ width: "50%" }}
            mb={5}
            m={"auto"}
            mt={2}
            justifyContent="center"
            alignItems="center"
            direction="column"
            spacing={2}
          >
            <TextField
              id="outlined"
              // error={!dataModal.name}
              // helperText={!dataModal.name ? "Поле обязательно к заполнению" : ""}
              label="Производитель"
              size="small"
              sx={{ width: "100%" }}
              name="producer"
              placeholder={dataModal?.producer ?? ""}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined"
              label="Модель"
              size="small"
              sx={{ width: "100%" }}
              name="model"
              placeholder={dataModal?.model ?? ""}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="outlined"
              label="Рабочая точка, P(бар)/Q(м3/ч)"
              size="small"
              sx={{ width: "100%" }}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
              type="number"
              name="workingPoint"
              placeholder={String(dataModal?.workingPoint ?? "")}
            />

            <TextField
              id="outlined"
              label="Частотный преобразователь"
              size="small"
              sx={{ width: "100%" }}
              name="convertor"
              placeholder={dataModal?.convertor ?? ""}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined"
              label="КПД"
              size="small"
              type="number"
              sx={{ width: "100%" }}
              name="efficiency"
              placeholder={String(dataModal?.efficiency ?? "")}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>

          <Box justifyContent="space-between" alignItems="center" display="flex">
            <IconButton
              disabled={isFirstComponent}
              color="primary"
              name="back"
              onClick={() => nextComponent("back")}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.2)",
                },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 50 }} />
            </IconButton>
            <Button
              sx={{ height: 40 }}
              variant="contained"
              endIcon={<ExitToAppIcon />}
              onClick={goToPageInstallation}
            >
              Закончить настройку
            </Button>
            <IconButton
              onClick={addDataInTable}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.2)",
                },
              }}
              disabled={isLastComponent}
              color="primary"
              name="next"
            >
              <ArrowForwardIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </Box>
        </>
      )}
    </>
  );
}
