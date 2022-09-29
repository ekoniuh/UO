/* eslint-disable react-hooks/exhaustive-deps */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Box, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";

import React, { useContext, useEffect, useState } from "react";

import { INITIAL_DATA_MODAL_ANTISCALANT as INITIAL_DATA_MODAL } from "./constant";
import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { API_CONFIG } from "../../../../../constants";
import { getNotificationConfig, Loader } from "../../../../../helpers";
import { Context } from "../../../../../index";
import { httpService } from "../../../../../services";

export function Antiscalant({
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
    const response = await httpService.sendRequest(
      API_CONFIG.getAntiscalantParams(installationId).PATH
    );
    setInitialLoadData(response?.data ?? {});
    setDataModal(response?.data ?? INITIAL_DATA_MODAL);
    showAlert(getNotificationConfig(response.status));

    setIsLoading(false);
  };

  useEffect(() => {
    loadDataPump();
  }, []);

  const changeDataModal = ({ target }) => {
    const { name, value, type } = target;
    const valueModal =
      type === "number" ? Number(value) : type === "radio" ? value === "true" : value;

    setDataModal((prev) => ({ ...prev, [name]: valueModal }));
  };

  const addDataInTable = async () => {
    if (JSON.stringify(dataModal) === JSON.stringify(initialLoadData)) {
      nextComponent("next");
      return;
    }

    setIsLoading(true);

    const { PATH, METHOD, HEADERS } = API_CONFIG.updateAntiscalantParams(installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, dataModal, HEADERS);
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
        <Loader isLoading={isLoading} size={"100px"} lineHeight={"475px"} />
      ) : (
        <>
          <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
            Антискалант
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
              label="Производитель"
              size="small"
              sx={{ width: "100%" }}
              name="producer"
              placeholder={String(dataModal?.producer ?? "")}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined"
              label="Наименование"
              size="small"
              sx={{ width: "100%" }}
              name="nomination"
              placeholder={String(dataModal?.nomination ?? "")}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined"
              label="Формула"
              size="small"
              sx={{ width: "100%" }}
              name="formula"
              placeholder={String(dataModal?.formula ?? "")}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <FormLabel id="controlled-radio-buttons-group">Сигнал с установки</FormLabel>
              <RadioGroup row name="isExist" value={dataModal?.isExist} onChange={changeDataModal}>
                <FormControlLabel value={true} control={<Radio />} label="Да" />
                <FormControlLabel value={false} control={<Radio />} label="Нет" />
              </RadioGroup>
            </FormControl>
            <TextField
              id="outlined"
              disabled={dataModal?.isExist}
              label="Дозировка гр/м3"
              size="small"
              sx={{ width: "100%" }}
              name="dosage"
              type="number"
              placeholder={String(dataModal?.dosage ?? "")}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="outlined"
              label="Плотность"
              disabled={!dataModal?.isExist}
              size="small"
              sx={{ width: "100%" }}
              onChange={changeDataModal}
              InputLabelProps={{
                shrink: true,
              }}
              type="number"
              name="consistence"
              placeholder={String(dataModal?.consistence ?? "")}
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

            {isLastComponent && (
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
            )}
          </Box>
        </>
      )}
    </>
  );
}
