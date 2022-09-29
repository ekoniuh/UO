import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { ModalAddInstallation, RowTable } from "./";
import { ModalAddUser, ModalDeleteUser } from "../User";

export function MainTable({ dataTable, showAlert, loadDataPage }) {
  const [isOpenModal, setIsOpenModal] = useState({
    addInst: false,
    addUser: false,
    deleteUser: false,
  });
  const [idCompany, setIdCompany] = useState();
  const [installationId, setInstallationId] = useState();
  const [emailUser, setEmailUser] = useState("");

  const closeModal = (name) => {
    setIsOpenModal((prev) => ({ ...prev, [name]: false }));
  };

  const openModal = ({name, idCompany = "", installationId = "", emailUser = ""}) => {
    setIsOpenModal((prev) => ({ ...prev, [name]: true }));
    setIdCompany(idCompany);
    setInstallationId(installationId);
    setEmailUser(emailUser);
  };

  return (
    <>
      {isOpenModal.addInst && (
        <ModalAddInstallation
          isOpenModal={isOpenModal.addInst}
          closeModal={closeModal}
          idCompany={idCompany}
          showAlert={showAlert}
        />
      )}
      {isOpenModal.addUser && (
        <ModalAddUser
          isOpenModal={isOpenModal.addUser}
          closeModal={closeModal}
          idCompany={idCompany}
          installationId={installationId}
          showAlert={showAlert}
          loadDataPage={loadDataPage}
        />
      )}
      {isOpenModal.deleteUser && (
        <ModalDeleteUser
          isOpenModal={isOpenModal.deleteUser}
          closeModal={closeModal}
          emailUser={emailUser}
          showAlert={showAlert}
          loadDataPage={loadDataPage}
        />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ borderRight: "2px solid #CAC0C0" }}>Название предприятия</TableCell>
              <TableCell sx={{ borderRight: "2px solid #CAC0C0" }} align="center"></TableCell>
              {/* <TableCell sx={{ borderRight: "2px solid #CAC0C0" }} align="center"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((dataCompany) => (
              <RowTable
                key={dataCompany.name}
                dataInst={dataCompany.installations}
                dataCompany={dataCompany}
                closeModal={closeModal}
                openModal={openModal}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
