import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 644,
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

export function ModalSave({ isClickBtnSave, saveChangeData, closeModal }) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    closeModal();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isClickBtnSave);
  }, [isClickBtnSave]);

  function handleClickSave() {
    saveChangeData();
    setOpen(false);
    closeModal();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Изменение данного события повлечет за собой перерасчет всех формул и параметров
            завязанных на него. Вы действительно хотите изменить событие?
          </Typography>
          <Box sx={styleBtn}>
            <Button onClick={handleClose}>Отменить</Button>
            <Button onClick={handleClickSave}>Подтвердить</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
