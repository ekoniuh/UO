/* eslint-disable no-unused-vars */
import { Box, Typography } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LoadingButton from "@mui/lab/LoadingButton";
import { Chip, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { API_CONFIG } from "../../../../constants";
import { DatePicker, getNotificationConfig } from "../../../../helpers";
import { INITIAL_DATA_MODAL } from "./constant";
import { httpService } from "../../../../services";
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

export function ModalAddDocument({
  isOpenModal,
  closeModal,
  loadDataPage,
  installationId,
  setNotification,
}) {
  const [isEmptyFields, setIsEmptyFields] = useState(true);
  const [dataModal, setDataModal] = useState(INITIAL_DATA_MODAL);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDate, setActiveDate] = useState(new Date());
  const [file, setFile] = useState();

  function handleChangeDate(value) {
    setActiveDate(value);
  }

  const spendDescriptionFile = async () => {
    const { PATH, METHOD } = API_CONFIG.sendFiles(installationId);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("Title", dataModal.Title);
    formData.append("Description", dataModal.Description);
    formData.append("FileDate", new Date(activeDate).toISOString());
    formData.append("FormFile", file);

    const response = await httpService.sendRequest(PATH, METHOD, formData);
    setIsLoading(false);
    setNotification(getNotificationConfig(response.status));
    closeModal();
    loadDataPage();
    setNotification(getNotificationConfig(response.status));

    // if (response.status !== "update") {
    //   showAlert(getNotificationConfig(response.status));
    // } else {
    //   showAlert(getNotificationConfig("create", "Установка"));
    //   const { id } = response.data;
    //   saveIdInst(id);
    //   nextComponent("next");
    // }
  };

  useEffect(() => {
    setIsEmptyFields(!dataModal.Title || !file);
  }, [dataModal, file]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataModal((prev) => ({ ...prev, [name]: value }));
  };

  const changeInputFile = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Modal
      open={isOpenModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Описание документа
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
            error={!dataModal.Title}
            helperText={!dataModal.Title ? "Поле обязательно к заполнению" : ""}
            label="Название документа"
            size="small"
            sx={{ width: "100%" }}
            name="Title"
            value={dataModal.Title}
            onChange={handleChange}
          />
          <TextField
            id="outlined"
            label="Описание"
            multiline
            rows={4}
            sx={{ width: "100%" }}
            name="Description"
            value={dataModal.Description}
            onChange={handleChange}
          />

          {/* <IconButton aria-label="delete" color="primary">
            <UploadFileIcon />
          </IconButton> */}
          <DatePicker
            customStyle={{ marginLeft: 0, color: "black", background: "red" }}
            name="FileDate"
            date={activeDate}
            maxDate={new Date()}
            changeDate={handleChangeDate}
          />
          <Button
            variant="outlined"
            color={!file?.name && "error"}
            startIcon={<UploadFileIcon />}
            component="label"
          >
            Загрузить файл
            <input
              hidden
              // accept="image/*"
              onChange={changeInputFile}
              // multiple
              type="file"
            />
          </Button>

          {file?.name && <Chip label={file?.name} variant="outlined" />}
        </Stack>

        <Box sx={styleBtn}>
          <Button variant="outlined" startIcon={<HighlightOffIcon />} onClick={closeModal}>
            Отменить
          </Button>
          <LoadingButton
            onClick={spendDescriptionFile}
            endIcon={<SendIcon />}
            loading={isLoading}
            disabled={isEmptyFields}
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
