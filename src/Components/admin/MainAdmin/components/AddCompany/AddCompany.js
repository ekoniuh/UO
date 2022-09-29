import React, { useState } from "react";
import { Button } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ModalAddCompany } from "./ModalAddCompany";

export const AddCompany = ({ showAlert, loadDataPage }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      {isOpenModal && (
        <ModalAddCompany
          isOpenModal={isOpenModal}
          closeModal={closeModal}
          showAlert={showAlert}
          loadDataPage={loadDataPage}
        />
      )}
      <Button
        style={{ display: "flex", margin: "10px 10px 30px auto" }}
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={openModal}
      >
        Добавить компанию
      </Button>
    </>
  );
};
