import { Box, Modal, Typography } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { API_CONFIG } from "../../../../../constants";
import { getNotificationConfig } from "../../../../../helpers";
import { httpService } from "../../../../../services";

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

const INITIAL_DATA_COMPANY = {
  name: "",
  address: "",
  email: "",
};

export function ModalAddCompany({ isOpenModal, closeModal, showAlert, loadDataPage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataModal, setDataModal] = useState(INITIAL_DATA_COMPANY);
  const [isEmptyFields, setIsEmptyFields] = useState(true);
  const [helperTextEmail, setHelperTextEmail] = useState("Поле обязательно к заполнению");

  const createCompany = async () => {
    const { PATH, METHOD, HEADERS } = API_CONFIG.createCompany();

    setIsLoading(true);
    const response = await httpService.sendRequest(PATH, METHOD, dataModal, HEADERS);

    if (response.status !== "update") {
      showAlert(getNotificationConfig(response.status));
    } else {
      showAlert(getNotificationConfig("create", "Предприятие"));
      closeModal();
      loadDataPage();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // const isEmptyField = Object.values(dataModal)
    //   .filter((item) => typeof item === "string")
    //   .every((item) => !item);

    setIsEmptyFields(
      !dataModal.name ||
        !dataModal.email ||
        !dataModal.address ||
        !validateEmail(dataModal["email"])
    );
    setHelperTextEmail(() => getHelperTextEmail());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataModal]);

  const validateEmail = (email) => {
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return re.test(String(email).toLowerCase());
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataModal((prev) => ({ ...prev, [name]: value }));
  };

  const resetFieldsCompany = () => {
    setDataModal(() => ({ ...INITIAL_DATA_COMPANY }));
    closeModal();
  };

  const getHelperTextEmail = () => {
    const text = !dataModal.email
      ? "Поле обязательно к заполнению"
      : !validateEmail(dataModal["email"])
      ? "Напишите корректную почту"
      : "";
    return text;
  };

  return (
    <Modal
      open={isOpenModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Данные компании
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
            error={!dataModal.name}
            helperText={!dataModal.name ? "Поле обязательно к заполнению" : ""}
            label="Название"
            size="small"
            sx={{ width: "100%" }}
            name="name"
            value={dataModal.name}
            onChange={handleChange}
          />
          <TextField
            id="outlined"
            error={!dataModal.address}
            label="Адрес"
            helperText={!dataModal.address ? "Поле обязательно к заполнению" : ""}
            size="small"
            sx={{ width: "100%" }}
            name="address"
            value={dataModal.address}
            onChange={handleChange}
          />
          <TextField
            id="outlined"
            error={!dataModal.email || !validateEmail(dataModal["email"])}
            label="Почта"
            helperText={helperTextEmail}
            size="small"
            sx={{ width: "100%" }}
            name="email"
            type="email"
            required
            value={dataModal.email}
            onChange={handleChange}
          />
        </Stack>

        <Box sx={styleBtn}>
          <Button variant="outlined" startIcon={<HighlightOffIcon />} onClick={resetFieldsCompany}>
            Отменить
          </Button>
          <LoadingButton
            onClick={createCompany}
            endIcon={<SendIcon />}
            loading={isLoading}
            disabled={isEmptyFields}
            // loadingPosition="end"
            variant="contained"
            name="next"
          >
            {!isLoading && "Создать"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
}
