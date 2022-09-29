/* eslint-disable react-hooks/exhaustive-deps */
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import { API_CONFIG } from "../../../../constants";
import { getNotificationConfig, Loader, Modal } from "../../../../helpers/";
import { httpService } from "../../../../services";
import { INITIAL_DATA_STAGE } from "./constant";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import CreateIcon from "@mui/icons-material/Create";
import { ModalDeleteStage } from "./Modals/ModalDeleteStage";
import { ModalUpdateStage } from "./Modals/ModalUpdateStage";

export function InstallationConfiguration() {
  const { installationId } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false); //TODO изменить на тру
  const [typeModal, setTypeModal] = useState("ADD");
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [stageId, setStageId] = useState(null);

  const [dataStages, setDataStages] = useState([]);
  const [newStage, setNewStage] = useState(INITIAL_DATA_STAGE);

  useEffect(() => {
    loadDataPage();
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
    setIsLoading(true);

    const response = await httpService.sendRequest(API_CONFIG.getStages(installationId).PATH);

    setIsLoading(false);
    setDataStages(response?.data ?? []);
    setNotification(getNotificationConfig(response.status, "конфигурации установки"));
  };

  const addDataInTable = async () => {
    setIsLoading(true);

    const { PATH, METHOD, HEADERS } = API_CONFIG.addStage(installationId);
    const { status } = await httpService.sendRequest(PATH, METHOD, newStage, HEADERS);
    setNotification(getNotificationConfig(status));
    setNewStage({ ...INITIAL_DATA_STAGE });
    loadDataPage();

    setIsLoading(false);
  };

  const deleteStage = async () => {
    const { PATH, METHOD } = API_CONFIG.deleteStage(installationId, stageId);

    const response = await httpService.sendRequest(PATH, METHOD);

    if (response.status !== "update") {
      setNotification(getNotificationConfig(response.status));
    } else {
      setNotification(getNotificationConfig("deleteStage"));
      loadDataPage();
    }
    setIsOpenModalDelete(false);
  };

  const closeModal = () => {
    setIsOpenModalAdd(false);
  };

  const openModal = (type) => {
    setTypeModal(type);
    setIsOpenModalAdd(true);
  };

  const changeDataTable = ({ target }) => {
    const { name, value, type } = target;

    setNewStage((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const showModalForDelete = (stageId) => {
    setStageId(stageId);
    setIsOpenModalDelete(true);
  };

  const showModalForUpdate = (stage) => {
    setStageId(stage);
    setIsOpenModalUpdate(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          {isOpenModalDelete && (
            <ModalDeleteStage
              isOpenModal={isOpenModalDelete}
              closeModal={() => setIsOpenModalDelete(false)}
              deleteStage={deleteStage}
            />
          )}
          {isOpenModalUpdate && (
            <ModalUpdateStage
              infoStage={stageId}
              isOpenModal={isOpenModalUpdate}
              closeModal={() => setIsOpenModalUpdate(false)}
              installationId={installationId}
              loadDataPage={loadDataPage}
              setNotification={setNotification}
            />
          )}
          {isOpenModalAdd && (
            <Modal
              isClickOpenModal={isOpenModalAdd}
              actionSuccess={addDataInTable}
              closeModal={closeModal}
              typeModal={typeModal}
            />
          )}
          <Modal
            isClickOpenModal={isOpenModalAdd}
            actionSuccess={addDataInTable}
            closeModal={closeModal}
            typeModal={typeModal}
          />
          <form className="section-title">
            <fieldset>
              <legend>Конфигурация установки:</legend>
              <div>
                <table className="table-data">
                  <thead>
                    <tr>
                      <th>Ступень</th>
                      <th></th>
                      <th>Производитель</th>
                      <th>Модель</th>
                      <th>Количество</th>
                      <th>Фильтрация, мкм</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td colSpan={3}>
                        <input type="button" value="+" onClick={null} />
                      </td>
                      <td colSpan={2}>
                        <input type="button" value="-" onClick={null} />
                      </td>
                    </tr> */}
                    {dataStages.map((stage) => {
                      return (
                        <>
                          <tr>
                            <td rowSpan={2} style={{ borderBottom: "2px solid black" }}>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: 50, display: "flex" }}>
                                  <IconButton
                                    onClick={() => showModalForUpdate(stage)}
                                    aria-label="change"
                                    color="success"
                                  >
                                    <CreateIcon />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => showModalForDelete(stage?.id)}
                                    aria-label="delete"
                                    color="error"
                                  >
                                    <DeleteForeverIcon />
                                  </IconButton>
                                </div>
                                <span style={{ margin: "auto" }}>{stage?.name}</span>
                              </div>
                            </td>
                            <th>Корпус</th>
                            <td>{stage?.bodyProdaction}</td>
                            <td>{stage?.bodyModel}</td>
                            <td>{stage?.bodyCount}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <th style={{ borderBottom: "2px solid black" }}>Сменный элемент</th>
                            <td style={{ borderBottom: "2px solid black" }}>
                              {stage?.filterProdaction}
                            </td>
                            <td style={{ borderBottom: "2px solid black" }}>
                              {stage?.filterModel}
                            </td>
                            <td style={{ borderBottom: "2px solid black" }}>
                              {stage?.filterCount}
                            </td>
                            <td style={{ borderBottom: "2px solid black" }}>{stage?.filtration}</td>
                          </tr>
                        </>
                      );
                    })}
                    <tr>
                      <td rowSpan={2}>
                        <input
                          type="text"
                          name={"name"}
                          value={newStage.name}
                          onChange={changeDataTable}
                        />
                      </td>
                      <th>Корпус</th>
                      <td>
                        <input
                          type="text"
                          name={"bodyProdaction"}
                          value={newStage.bodyProdaction}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={"bodyModel"}
                          value={newStage.bodyModel}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={"bodyCount"}
                          value={newStage.bodyCount}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Сменный элемент</th>
                      <td>
                        <input
                          type="text"
                          name={"filterProdaction"}
                          value={newStage.filterProdaction}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={"filterModel"}
                          value={newStage.filterModel}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={"filterCount"}
                          value={newStage.filterCount}
                          onChange={changeDataTable}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={"filtration"}
                          value={newStage.filtration}
                          onChange={changeDataTable}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 30 }} className="table-data">
                <input
                  type="button"
                  className="submit"
                  onClick={() => openModal("ADD")}
                  value="Сохранить"
                />
              </div>
            </fieldset>
          </form>
        </>
      )}
    </>
  );
}
