/* eslint-disable no-unused-vars */
import { Box, Typography } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { API_CONFIG } from "../../../../../constants";
import { getNotificationConfig } from "../../../../../helpers";
import { httpService } from "../../../../../services";

const styleBtn = {
  display: "flex",
  justifyContent: "space-around",
  width: " 80%",
  margin: "16px auto",
};

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 655,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  textAlign: "center",
};

export function ModalUpdateStage({
  isOpenModal,
  closeModal,
  loadDataPage,
  installationId,
  setNotification,
  infoStage,
}) {
  const [dataModal, setDataModal] = useState(infoStage);
  const [isLoading, setIsLoading] = useState(false);

  const changeDataTable = ({ target }) => {
    const { name, value, type } = target;

    setDataModal((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const spendDescriptionStage = async () => {
    const { PATH, METHOD, HEADERS } = API_CONFIG.updateStage(installationId);
    setIsLoading(true);

    const response = await httpService.sendRequest(PATH, METHOD, dataModal, HEADERS);
    setIsLoading(false);
    setNotification(getNotificationConfig(response.status));
    closeModal();
    loadDataPage();
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataModal((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      open={isOpenModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Конфигурация установки
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Stack
            sx={{ width: "30%" }}
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
              label="Ступень"
              size="small"
              sx={{ width: "100%" }}
              name="name"
              value={dataModal.name}
              onChange={handleChange}
            />
            <Typography>Корпус</Typography>
            <TextField
              id="outlined"
              label="Производитель"
              size="small"
              sx={{ width: "100%" }}
              name="bodyProdaction"
              value={dataModal.bodyProdaction}
              onChange={handleChange}
            />
            <TextField
              id="outlined"
              label="Модель"
              size="small"
              sx={{ width: "100%" }}
              name="bodyModel"
              value={dataModal.bodyModel}
              onChange={handleChange}
            />
            <TextField
              id="outlined"
              label="Количество"
              size="small"
              sx={{ width: "100%" }}
              name="bodyCount"
              type="number"
              value={dataModal.bodyCount}
              onChange={handleChange}
            />
          </Stack>
          <Stack
            sx={{ width: "30%" }}
            mb={5}
            m={"auto"}
            mt={2}
            justifyContent="center"
            alignItems="center"
            direction="column"
            spacing={2}
          >
            <Typography>Сменный элемент</Typography>
            <TextField
              id="outlined"
              label="Производитель"
              size="small"
              sx={{ width: "100%" }}
              name="filterProdaction"
              value={dataModal.filterProdaction}
              onChange={handleChange}
            />
            <TextField
              id="outlined"
              label="Модель"
              size="small"
              sx={{ width: "100%" }}
              name="filterModel"
              value={dataModal.filterModel}
              onChange={handleChange}
            />
            <TextField
              id="outlined"
              label="Количество"
              size="small"
              sx={{ width: "100%" }}
              name="filterCount"
              type="number"
              value={dataModal.filterCount}
              onChange={handleChange}
            />
            <TextField
              id="outlined"
              label="Фильтрация, мкм"
              size="small"
              sx={{ width: "100%" }}
              name="filtration"
              type="number"
              value={dataModal.filtration}
              onChange={handleChange}
            />
          </Stack>
        </Box>

        <Box sx={styleBtn}>
          <Button variant="outlined" startIcon={<HighlightOffIcon />} onClick={closeModal}>
            Отменить
          </Button>
          <LoadingButton
            onClick={spendDescriptionStage}
            endIcon={<SendIcon />}
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
            name="next"
          >
            Отправить
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
}
