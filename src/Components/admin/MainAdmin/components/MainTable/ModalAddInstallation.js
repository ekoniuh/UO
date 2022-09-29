import { Box, Modal } from "@material-ui/core";
import React, { useState } from "react";
import { Antiscalant, DescriptionInst, Pump } from "../AdjustingInstallation";

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

const INITIAL_INDEX_COMPONENT = 0;

export function ModalAddInstallation({ isOpenModal, closeModal, idCompany, showAlert }) {
  const [indexCurrentComponent, setIndexCurrentComponent] = useState(INITIAL_INDEX_COMPONENT);
  const [idInst, setIdInst] = useState();

  const componentsPage = [DescriptionInst, Pump, Antiscalant];

  const resetIndex = () => {
    setIndexCurrentComponent(INITIAL_INDEX_COMPONENT);

    closeModal("addInst");
  };

  const nextComponent = (name) => {
    setIndexCurrentComponent((prevIndex) => {
      const lastIndex = componentsPage.length - 1;

      if (name === "back") {
        if (prevIndex - 1 < 1) {
          return prevIndex;
        }

        return prevIndex - 1;
      }
      if (name === "next") {
        if (prevIndex + 1 > lastIndex) {
          return lastIndex;
        }

        return prevIndex + 1;
      }
    });
  };

  const CurrentComponent = componentsPage[indexCurrentComponent];
  const isLastComponent = indexCurrentComponent === componentsPage.length - 1;
  const isFirstComponent = indexCurrentComponent === 1;

  return (
    <>
      <Modal
        open={isOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <CurrentComponent
            installationId={idInst}
            saveIdInst={(id) => setIdInst(id)}
            nextComponent={nextComponent}
            isOpenModal={isOpenModal}
            closeModal={resetIndex}
            idCompany={idCompany}
            showAlert={showAlert}
            isLastComponent={isLastComponent}
            isFirstComponent={isFirstComponent}
          />
        </Box>
      </Modal>
    </>
  );
}
