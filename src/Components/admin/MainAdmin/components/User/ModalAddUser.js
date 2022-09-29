import { Box } from "@material-ui/core";

import { Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { API_CONFIG } from "../../../../../constants";
import { Loader } from "../../../../../helpers";
import { httpService } from "../../../../../services";
import { ChooseUser } from "./ChooseUser";
import { CreateNewUser } from "./CreateNewUser/CreateNewUser";

export function ModalAddUser({
  isOpenModal,
  closeModal,
  showAlert,
  loadDataPage,
  idCompany,
  installationId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateUser, setIsCreateUser] = useState(false);

  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    setIsLoading(true);

    const { PATH } = API_CONFIG.getAllUsers(idCompany);
    const response = await httpService.sendRequest(PATH);

    setIsLoading(false);
    setUsers(response?.data ?? []);

    if (response.status === "empty") {
      setIsCreateUser(true);
    }
  };

  useEffect(() => {
    getAllUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isCreateUser) {
      setUsers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateUser]);

  const showCreateUser = () => {
    setIsCreateUser(true);
  };

  return (
    <Modal
      disableEnforceFocus
      open={isOpenModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isLoading ? (
        <Box>
          <Loader isLoading={isLoading} />
        </Box>
      ) : (
        <>
          {(!isCreateUser || users.length > 0) && (
            <ChooseUser
              key={isCreateUser}
              closeModal={closeModal}
              showAlert={showAlert}
              idCompany={idCompany}
              users={users}
              installationId={installationId}
              loadDataPage={loadDataPage}
              isCreateUser={showCreateUser}
            />
          )}
          {(!users.length || isCreateUser) && (
            <CreateNewUser
              closeModal={closeModal}
              showAlert={showAlert}
              installationId={installationId}
              loadDataPage={loadDataPage}
            />
          )}
        </>
      )}
    </Modal>
  );
}
