import { Box, Typography } from "@material-ui/core";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

import { API_CONFIG } from "../../../../../constants";
import { getNotificationConfig } from "../../../../../helpers";
import { httpService } from "../../../../../services";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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

const styleBtn = {
  display: "flex",
  justifyContent: "space-around",
  width: " 80%",
  margin: "16px auto",
};

function getStyles(email, user, theme) {
  return {
    fontWeight:
      user.email !== email ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export function ChooseUser({
  closeModal,
  showAlert,
  loadDataPage,
  idCompany,
  users,
  installationId,
  isCreateUser,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ email: "" });
  const theme = useTheme();

  const resetFields = () => {
    setUser({
      email: "",
    });
    closeModal("addUser");
  };

  const chooseUser = (event) => {
    const {
      target: { value },
    } = event;

    setUser((prev) => ({ ...prev, email: value }));
  };

  const saveChooseUser = async () => {
    setIsLoading(true);
    const { PATH } = API_CONFIG.assignUser(installationId, user.email);
    const response = await httpService.sendRequest(PATH);

    setIsLoading(false);
    
    if (response.status === "success" || response.status === "empty") {
      showAlert(getNotificationConfig("addUser", "добавлен"));
    } else {
      showAlert(getNotificationConfig(response.status));
    }
  };

  return (
    <Box sx={styleBox}>
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Выбор пользователя
        </Typography>
        <FormControl sx={{ mt: 10, mb: 10, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Email</InputLabel>
          <Select
            // open={true}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            // multiple
            value={user.email}
            onChange={chooseUser}
            input={<OutlinedInput label="Email" />}
            MenuProps={MenuProps}
          >
            {users.map(({ email }) => (
              <MenuItem key={email} value={email} style={getStyles(email, user, theme)}>
                {email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormHelperText>Выберите пользователя</FormHelperText> */}
      </Stack>

      <Box sx={styleBtn}>
        <Button variant="outlined" startIcon={<HighlightOffIcon />} onClick={resetFields}>
          Отменить
        </Button>

        <LoadingButton
          sx={{ borderRadius: 10 }}
          variant="contained"
          disabled={!user.email}
          color="success"
          startIcon={<SaveIcon />}
          loading={isLoading}
          // loadingPosition="end"
          onClick={saveChooseUser}
        >
          Сохранить
        </LoadingButton>
        <Button endIcon={<SendIcon />} variant="contained" onClick={isCreateUser} name="next">
          Создать
        </Button>
      </Box>
    </Box>
  );
}
