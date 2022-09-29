import Button from "@mui/material/Button";
import { Box, Typography } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";

import React, { useEffect, useState } from "react";
import { API_CONFIG } from "../../../../../constants";
import { INITIAL_DATA_MODAL_INST as INITIAL_DATA_MODAL } from "./constant";
import { getNotificationConfig } from "../../../../../helpers";
import { httpService } from "../../../../../services";

const styleBtn = {
  display: "flex",
  justifyContent: "space-around",
  width: " 80%",
  margin: "16px auto",
};

export function DescriptionInst({ saveIdInst, nextComponent, closeModal, idCompany, showAlert }) {
  const [isEmptyFields, setIsEmptyFields] = useState(true);
  const [dataModal, setDataModal] = useState(INITIAL_DATA_MODAL);
  const [isLoading, setIsLoading] = useState(false);

  const spendDataInstallation = async () => {
    const { PATH, METHOD, HEADERS } = API_CONFIG.createInstallation(idCompany);

    setIsLoading(true);
    const response = await httpService.sendRequest(PATH, METHOD, dataModal, HEADERS);
    setIsLoading(false);

    if (response.status !== "update") {
      showAlert(getNotificationConfig(response.status));
    } else {
      showAlert(getNotificationConfig("create", "Установка"));
      const { id } = response.data;
      saveIdInst(id);
      nextComponent("next");
    }
  };

  useEffect(() => {
    // const isEmptyField = Object.values(dataModal)
    //   .filter((item) => typeof item === "string")
    //   .every((item) => !item);

    setIsEmptyFields(!dataModal.name || !dataModal.address);
  }, [dataModal]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataModal((prev) => ({ ...prev, [name]: name === "isActive" ? value === "true" : value }));
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Описание установки
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
          label="Имя установки"
          size="small"
          sx={{ width: "100%" }}
          name="name"
          value={dataModal.name}
          onChange={handleChange}
        />
        <TextField
          id="outlined"
          label="Модель"
          size="small"
          sx={{ width: "100%" }}
          name="model"
          value={dataModal.model}
          onChange={handleChange}
        />

        <TextField
          id="outlined"
          error={!dataModal.address}
          label="Адрес установки"
          helperText={!dataModal.address ? "Поле обязательно к заполнению" : ""}
          size="small"
          sx={{ width: "100%" }}
          name="address"
          value={dataModal.address}
          onChange={handleChange}
        />

        <TextField
          id="outlined"
          label="Координаты"
          size="small"
          sx={{ width: "100%" }}
          name="coordinates"
          value={dataModal.coordinates}
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
          onClick={() => closeModal("addInst")}
        >
          Отменить
        </Button>
        <LoadingButton
          onClick={spendDataInstallation}
          endIcon={<SendIcon />}
          loading={isLoading}
          disabled={isEmptyFields}
          loadingPosition="end"
          variant="contained"
          name="next"
        >
          Создать
        </LoadingButton>
      </Box>
    </>
  );
}
