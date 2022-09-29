import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
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

export function ModalDeleteStage({ isOpenModal, deleteStage, closeModal }) {
  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Вы действительно хотите удалить ступень?
          </Typography>
          <Box sx={styleBtn}>
            <Button onClick={closeModal}>Отменить</Button>
            <Button onClick={deleteStage}>Подтвердить</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
