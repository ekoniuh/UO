// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Button from "@mui/material/Button";

// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import { Box, Modal, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";

import React, { useContext, useEffect, useState } from "react";
import { INITIAL_PUMP } from "../constant";
import { API_CONFIG } from "../../../../constants";
// import { httpService } from "../../../../services";
import { getNotificationConfig, Loader } from "../../../../helpers";
import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../../index";

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

const styleBtn = {
  display: "flex",
  justifyContent: "space-around",
  width: " 80%",
  margin: "16px auto",
};

export function Pump({ isClickOpenModal, closeModal, actionSuccess, typeModal }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { store } = useContext(Context);

  const [open, setOpen] = useState(false);
  // const [isEmptyFields, setIsEmptyFields] = useState(true);
  const [dataModal, setDataModal] = useState(INITIAL_PUMP);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState();

  // const URL = "http://217.21.59.101:30000/Installation/Create";

  useEffect(() => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  // const spendDataInstallation = async () => {
  //   const { METHOD } = API_CONFIG.createInstallation();

  //   const response = await fetch(URL, {
  //     method: METHOD,
  //     body: JSON.stringify(dataModal),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });

  //   if (response.ok) {
  //     const { id } = await response.json();

  //     setNotification(getNotificationConfig("update"));
  //     setOpen(false);
  //     closeModal();

  //     navigate(`/${store.user?.role.toLowerCase()}/setting-installation/${id}`);
  //   } else {
  //     setNotification(getNotificationConfig("badRequest"));
  //   }
  // };
  // useEffect(() => {
  //   // const isEmptyField = Object.values(dataModal)
  //   //   .filter((item) => typeof item === "string")
  //   //   .every((item) => !item);

  //   setIsEmptyFields(!dataModal.name || !dataModal.address);
  // }, [dataModal]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataModal((prev) => ({ ...prev, [name]: name === "isActive" ? value === "true" : value }));
  };

  const handleCloseModal = () => {
    closeModal();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isClickOpenModal);
  }, [isClickOpenModal]);

  function handleClickSave() {
    setIsLoading(true);
    // spendDataInstallation();
    setIsLoading(false);
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <Box sx={styleBox}>
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
                label="Имя установки"
                size="small"
                sx={{ width: "100%" }}
                value={dataModal.producer}
                name="producer"
                placeholder={dataModal?.producer}
                onChange={handleChange}
              />
              <TextField
                id="outlined"
                label="Модель"
                size="small"
                sx={{ width: "100%" }}
                name="model"
                placeholder={dataModal?.producer}
                onChange={handleChange}
              />

              <TextField
                id="outlined"
                label="Рабочая точка, P(бар)/Q(м3/ч)"
                size="small"
                sx={{ width: "100%" }}
                value={dataModal.address}
                onChange={handleChange}
                type="number"
                name="workingPoint"
                placeholder={dataModal?.workingPoint}
              />

              <TextField
                id="outlined"
                label="Частотный преобразователь"
                size="small"
                sx={{ width: "100%" }}
                // value={dataModal.coordinates}
                name="convertor"
                placeholder={dataModal?.convertor}
                onChange={handleChange}
              />
              <TextField
                id="outlined"
                label="Частотный преобразователь"
                size="small"
                sx={{ width: "100%" }}
                value={dataModal.coordinates}
                name="efficiency"
                placeholder={dataModal?.efficiency}
                onChange={handleChange}
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
                <FormLabel id="controlled-radio-buttons-group">Состояние установки</FormLabel>
                <RadioGroup row name="isActive" value={dataModal.isActive} onChange={handleChange}>
                  <FormControlLabel value={true} control={<Radio />} label="Активна" />
                  <FormControlLabel value={false} control={<Radio />} label="Не активна" />
                </RadioGroup>
              </FormControl>
              <TextField
                id="outlined-multiline-static"
                label="Описание установки"
                multiline
                rows={4}
                sx={{ width: "100%" }}
                name="description"
                value={dataModal.description}
                onChange={handleChange}
              />
            </Stack>

            <Box sx={styleBtn}>
              <Button
                variant="outlined"
                startIcon={<HighlightOffIcon />}
                onClick={handleCloseModal}
              >
                Отменить
              </Button>
              <Button
                variant="contained"
                disabled={isEmptyFields}
                endIcon={<SendIcon />}
                onClick={handleClickSave}
              >
                Создать
              </Button>
            </Box>
            {/* {isEmptyFields && <Typography variant="h6" component="h2">Заполните все поля</Typography>} */}
          </Box>
        )}
      </Modal>
    </>
  );
}
