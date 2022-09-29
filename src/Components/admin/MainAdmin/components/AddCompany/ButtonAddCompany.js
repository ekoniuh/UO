import React, { useState } from "react";
import { Button } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ModalAddCompany } from "./ModalAddCompany";

export const ButtonAddCompany = ({ loadDataPage }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <ModalAddCompany
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        loadDataPage={loadDataPage}
      />
      <Button
        style={{ display: "flex", margin: "10px 10px 30px auto" }}
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={() => setIsOpenModal(true)}
      >
        Добавить компанию
      </Button>
    </>
  );
};
