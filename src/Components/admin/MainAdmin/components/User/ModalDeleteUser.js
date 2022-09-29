import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { API_CONFIG } from "../../../../../constants";
import { getNotificationConfig } from "../../../../../helpers";

import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 655,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const styleBtn = {
  display: "flex",
  justifyContent: "space-around",
  width: " 80%",
  margin: "0 auto",
};

export function ModalDeleteUser({ isOpenModal, emailUser, closeModal, showAlert, loadDataPage }) {
  const [typeDeleteUser, setTypeDeleteUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = async () => {
    const { PATH, METHOD, HEADERS } = API_CONFIG.deleteUser(encodeURIComponent(emailUser));

    setIsLoading(true);
    const response = await fetch(`http://217.21.59.101:30000/${PATH}`, {
      method: METHOD,
      headers: { ...HEADERS, Authorization: "Bearer " + localStorage.getItem("token") },
    });

    if (response.ok) {
      showAlert(getNotificationConfig("deleteUser", "удалён"));
      closeModal();
      loadDataPage();
    } else {
      showAlert(getNotificationConfig("badRequest"));
    }

    setIsLoading(false);
  };

  const handleChangeSwitch = () => {
    setTypeDeleteUser((prev) => !prev);
  };

  return (
    <Modal
      open={isOpenModal}
      // onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Вы действительно хотите удалить пользователя?
        </Typography>
        <FormControl
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <RadioGroup
            column
            name="deleteUser"
            value={typeDeleteUser}
            onChange={handleChangeSwitch}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value={true} control={<Radio />} label="Удалить польностью" />
            <FormControlLabel value={false} control={<Radio />} label="Удалить из установки" />
          </RadioGroup>
        </FormControl>
        <Box sx={styleBtn}>
          <Button
            variant="outlined"
            startIcon={<HighlightOffIcon />}
            onClick={() => closeModal("deleteUser")}
          >
            Отменить
          </Button>
          <LoadingButton
            onClick={deleteUser}
            endIcon={<DeleteIcon />}
            loading={isLoading}
            // disabled={isEmptyFields}
            // loadingPosition="end"
            variant="contained"
            name="next"
          >
            {!isLoading && "Удалить"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
}
