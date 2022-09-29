/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import Grow from "@material-ui/core/Grow";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_CONFIG } from "../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../helpers/";
import { httpService } from "../../../services";
import { INITIAL_DATA_TABLE } from "./components/constant";
import { ModalAddDocument, ModalUpdateDocument, ModalDeleteDocument } from "./components/";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import { format } from "date-fns";

export function Documents() {
  const { installationId } = useParams();
  document.title = "Документы";
  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(false); // todo
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [fileId, setFileId] = useState(false);

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    loadDataPage();

    setIsLoading(false);
  }, [installationId]);

  useEffect(() => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  const loadDataPage = async () => {
    const response = await httpService.sendRequest(API_CONFIG.getFiles(installationId).PATH);

    setDataTable(response?.data ?? []);
    setNotification(getNotificationConfig(response.status, "документов"));
  };

  const deleteFile = async () => {
    const { PATH, METHOD } = API_CONFIG.deleteFile(installationId, fileId);

    const response = await httpService.sendRequest(PATH, METHOD);

    if (response.status !== "update") {
      setNotification(getNotificationConfig(response.status));
    } else {
      setNotification(getNotificationConfig("deleteFile"));
      loadDataPage();
    }
    setIsOpenModalDelete(false);
  };

  const showModalForDelete = (id) => {
    setFileId(id);
    setIsOpenModalDelete(true);
  };

  const showModalForUpdate = ({ FormFile, ...file }) => {
    setFileId(file);
    setIsOpenModalUpdate(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          {isOpenModalAdd && (
            <ModalAddDocument
              isOpenModal={isOpenModalAdd}
              closeModal={() => setIsOpenModalAdd(false)}
              installationId={installationId}
              loadDataPage={loadDataPage}
              setNotification={setNotification}
            />
          )}
          {isOpenModalDelete && (
            <ModalDeleteDocument
              isOpenModal={isOpenModalDelete}
              closeModal={() => setIsOpenModalDelete(false)}
              deleteFile={deleteFile}
            />
          )}
          {isOpenModalUpdate && (
            <ModalUpdateDocument
              infoFile={fileId}
              isOpenModal={isOpenModalUpdate}
              closeModal={() => setIsOpenModalUpdate(false)}
              installationId={installationId}
              loadDataPage={loadDataPage}
              setNotification={setNotification}
            />
          )}
          <div className="container">
            <form className="section-title">
              <legend>Документы:</legend>
              <Button
                style={{ display: "flex", margin: "10px 10px 30px auto" }}
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={() => setIsOpenModalAdd(true)}
              >
                Добавить документ
              </Button>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th>Название документа</th>
                      <th>Описание</th>
                      <th>Дата документа</th>
                      <th>Действие</th>
                    </tr>
                    {dataTable.map((file) => {
                      return (
                        <tr key={file?.fileId}>
                          <td>{file?.title}</td>
                          <td>{file?.description}</td>
                          <td>{format(new Date(file?.fileDate), "yyyy-MM-dd")}</td>
                          <td>
                            <IconButton aria-label="download" color="primary" disabled={true}>
                              <DownloadIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => showModalForDelete(file?.fileId)}
                              aria-label="delete"
                              color="error"
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => showModalForUpdate(file)}
                              aria-label="change"
                              color="success"
                            >
                              <CreateIcon />
                            </IconButton>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* <div style={{ marginTop: 30 }} className="table-data">
                <input type="button" className="submit" onClick={openModal} value="Добавить" />
              </div> */}
            </form>
          </div>
        </>
      )}
    </>
  );
}
