/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ReactVirtualizedTable } from "./virtualTable/virtualTable";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";
import { API_CONFIG } from "../../../constants";
import { DatePicker, getNotificationConfig, Loader, Modal } from "../../../helpers";
import { httpService } from "../../../services";
import { getDataChart } from "./Chart/getDataChart";

const initialPeriod = {
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
  endDate: new Date().toISOString(),
};

export function CostsAdmin() {
  const { installationId } = useParams();

  document.title = "Расходы";
  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [optionsForChart, setOptionsForChart] = useState();
  const [period, setPeriod] = useState({ startDate: "", endDate: "" });
  const [valueCheckBox, setValueCheckBox] = useState("getExpenses");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [typeModal, setTypeModal] = useState("ADD");

  const [dataTotalCosts, setDataTotalCosts] = useState({});
  const [dataTotalModelExpenses, setDataTotalModelExpenses] = useState({});
  const [dataOnDayCosts, setDataOnDayCosts] = useState([]);
  const [dataRegulationsModelTable, setDataRegulationsModelTable] = useState({
    drain: 0,
    circulation: 0,
    ratePerm: 0,
    electricity: 0,
    antiscalant: 0,
    wash: 0,
    chemicalWash: 0,
    membrane: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getApiForPeriod = API_CONFIG.getAnalyzePeriod(installationId).PATH;

    (async () => {
      setIsLoading(true);
      const responsePeriod = await httpService.sendRequest(getApiForPeriod);

      const { startDate, endDate } =
        responsePeriod.status === "empty" ||
        responsePeriod.status === "error" ||
        responsePeriod?.data?.startDate === ""
          ? initialPeriod
          : responsePeriod?.data;

      await loadDataPage({ startDate, endDate });

      setPeriod({ startDate, endDate });
      setNotification(getNotificationConfig(responsePeriod.status, "для периода даты"));
      setIsLoading(false);
    })();
  }, [installationId]);

  const loadDataPage = async ({ startDate, endDate }) => {
    const responseDataChart = await httpService.sendRequest(
      API_CONFIG.getRelativeAllExpenses(installationId, { startDate, endDate }).PATH
    ); // for chart
    const responseDataTotalCosts = await httpService.sendRequest(
      API_CONFIG.getTotalExpenses(installationId, { startDate, endDate }).PATH
    ); // суммарные расходы
    const responseDataTotalModelExpenses = await httpService.sendRequest(
      API_CONFIG.getTotalModelExpenses(installationId, { startDate, endDate }).PATH
    ); // Суммарные расходы (модель):
    const responseDataOnDayCosts = await httpService.sendRequest(
      API_CONFIG.getExpenses(installationId, { startDate, endDate }).PATH
    ); // one day fact
    const responseDataRegulationsModelTable = await httpService.sendRequest(
      API_CONFIG.getExpensesModel(installationId, { startDate, endDate }).PATH
    ); // регламент модель

    setDataTotalCosts(responseDataTotalCosts?.data ?? []);
    setDataTotalModelExpenses(responseDataTotalModelExpenses?.data ?? []);
    setDataOnDayCosts(responseDataOnDayCosts?.data ?? []);
    setDataRegulationsModelTable({ ...responseDataRegulationsModelTable?.data });

    setOptionsForChart(getDataChart(responseDataChart?.data ?? []));

    setNotification(getNotificationConfig(responseDataChart.status, "для графика"));
    setNotification(
      getNotificationConfig(responseDataTotalCosts.status, "для таблицы суммарные расходы")
    );
    setNotification(
      getNotificationConfig(
        responseDataTotalModelExpenses.status,
        "для таблицы суммарные расходы (модель)"
      )
    );
    setNotification(
      getNotificationConfig(
        responseDataOnDayCosts.status,
        "для таблицы Расходы по датам: Фактические значения"
      )
    );
    setNotification(
      getNotificationConfig(
        responseDataRegulationsModelTable.status,
        "для таблицы регламент (модель)"
      )
    );
  };

  useEffect(() => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  function handleChangeDate(date, name) {
    setPeriod({ ...period, [name]: new Date(format(new Date(date), "yyyy-MM-dd")).toISOString() });
  }

  function handleChangeInput({ target }) {
    const { name, value } = target;

    setDataRegulationsModelTable((prev) => ({ ...prev, [name]: Number(value) }));

  }

  function handleClickBtnShow() {
    (async () => {
      setIsLoading(true);
      await loadDataPage(period);
      setIsLoading(false);
    })();
  }

  function updateDataTable() {
    (async () => {
      setIsLoading(true);
      const { PATH, METHOD, HEADERS } = API_CONFIG.updateExpensesModel(installationId);
      const { status } = await httpService.sendRequest(
        PATH,
        METHOD,
        dataRegulationsModelTable,
        HEADERS
      );

      setNotification(getNotificationConfig(status, "для таблицы регламент(модель)"));

      await loadDataPage(period);
      setIsLoading(false);
    })();
  }

  function changeRadioBtn(e) {
    const { name, title } = e.target;
    (async () => {
      const { PATH } = API_CONFIG[name](installationId, period);

      const responseDataOnDayCosts = await httpService.sendRequest(PATH);

      setDataOnDayCosts(responseDataOnDayCosts?.data ?? []);

      setNotification(getNotificationConfig(responseDataOnDayCosts.status, `для таблицы ${title}`));
    })();

    setValueCheckBox(name);
  }

  function getDataExpensesOnDates(data) {
    data.forEach((item) => (item.date = format(new Date(item.date), "yyyy-MM-dd")));
    return data;
    // return data.map((item) => {
    //   item[valueCheckBox].date = format(new Date(item.date), "yyyy-MM-dd");
    //   return item[valueCheckBox];
    // });
  }
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = (type) => {
    setTypeModal(type);
    setIsOpenModal(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="container">
          <Modal
            isClickOpenModal={isOpenModal}
            actionSuccess={updateDataTable}
            closeModal={closeModal}
            typeModal={typeModal}
          />
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              color: "rgb(216, 228, 232)",
            }}
          >
            <div>
              <p className="section-title">Расходы:</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <div>C</div>
                <DatePicker
                  style={{ marginLeft: 0 }}
                  name="startDate"
                  date={period?.startDate}
                  changeDate={handleChangeDate}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <div>По</div>
                <DatePicker
                  style={{ marginLeft: 0 }}
                  name="endDate"
                  date={period?.endDate}
                  changeDate={handleChangeDate}
                />
              </div>

              <input
                type="button"
                className="button"
                style={{ marginLeft: "20px" }}
                defaultValue="Показать"
                onClick={handleClickBtnShow}
              />
            </div>
          </div>
          <div style={{ marginBottom: "30px", marginTop: "30px" }}>
            <HighchartsReact highcharts={Highcharts} options={optionsForChart} />
          </div>

          <div style={{ marginTop: "2vh" }}>
            <div style={{ marginTop: "9vh", marginBottom: 0, textAlign: "left" }}>
              <p
                style={{ textAlign: "left", marginBottom: 0, margin: 0 }}
                className="section-title"
              >
                Суммарные расходы:
              </p>
            </div>
            <table className="table-data" width="100%">
              <tbody>
                <tr>
                  <th colSpan={3}>Потоки, м3</th>
                  <th rowSpan={2}>Промывка</th>
                  <th rowSpan={2}>Электроэнергия, квтч</th>
                  <th rowSpan={2}>Антискалант, кг</th>
                  <th colSpan={1} rowSpan={2}>
                    Химическая промывка, кг
                  </th>
                  <th rowSpan={2} colSpan={1}>
                    Мембраны, шт
                  </th>
                </tr>
                <tr>
                  <th>Пермиат</th>
                  <th>Дренаж</th>
                  <th>Циркуляция</th>
                </tr>
                <tr>
                  <td style={{ width: "8%" }}>{dataTotalCosts?.ratePerm ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalCosts?.drain ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalCosts?.circulation ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalCosts?.wash ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalCosts?.electricity ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalCosts?.antiscalant ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalCosts?.chemicalWash ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalCosts?.membrane ?? "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "2vh" }}>
            <div style={{ marginTop: "9vh", marginBottom: 0, textAlign: "left" }}>
              <p
                style={{ textAlign: "left", marginBottom: 0, margin: 0 }}
                className="section-title"
              >
                Суммарные расходы (модель):
              </p>
            </div>
            <table className="table-data" width="100%">
              <tbody>
                <tr>
                  <th colSpan={3}>Потоки, м3</th>
                  <th rowSpan={2}>Промывка</th>
                  <th rowSpan={2}>Электроэнергия, квтч</th>
                  <th rowSpan={2}>Антискалант, кг</th>
                  <th colSpan={1} rowSpan={2}>
                    Химическая промывка, кг
                  </th>
                  <th rowSpan={2} colSpan={1}>
                    Мембраны, шт
                  </th>
                </tr>
                <tr>
                  <th>Пермиат</th>
                  <th>Дренаж</th>
                  <th>Циркуляция</th>
                </tr>
                <tr>
                  <td style={{ width: "8%" }}>{dataTotalModelExpenses?.ratePerm ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalModelExpenses?.drain ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalModelExpenses?.circulation ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalModelExpenses?.wash ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalModelExpenses?.electricity ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalModelExpenses?.antiscalant ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalModelExpenses?.chemicalWash ?? "-"}</td>
                  <td style={{ width: "8%" }}>{dataTotalModelExpenses?.membrane ?? "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 20 }}>
            <form>
              <fieldset>
                <legend style={{ textAlign: "left" }} className="section-title">
                  Регламент (модель):
                </legend>

                <table className="table-data" width="100%">
                  <tbody>
                    <tr>
                      <th colSpan="3">Потоки, % к Пермиату + дренаж</th>
                      <th rowSpan="2">Рабочее давление, бар</th>
                      <th rowSpan="2">Антискалант, г/м3</th>
                      <th rowSpan="2" colSpan="1">
                        Химическая промывка, г/м3
                      </th>
                      <th rowSpan="2">Мембраны, шт/10000 м3</th>
                    </tr>
                    <tr>
                      <th>Дренаж</th>
                      <th>Циркуляция</th>
                      <th>Промывка</th>
                    </tr>
                    <tr>
                      <td style={{ width: "8%" }}>
                        <input
                          type="number"
                          placeholder={dataRegulationsModelTable?.drain ?? "-"}
                          onChange={handleChangeInput}
                          name="drain"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td style={{ width: "8%" }}>
                        <input
                          type="number"
                          placeholder={dataRegulationsModelTable?.circulation ?? "-"}
                          onChange={handleChangeInput}
                          name="circulation"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td style={{ width: "8%" }}>
                        <input
                          type="number"
                          placeholder={dataRegulationsModelTable?.wash ?? "-"}
                          onChange={handleChangeInput}
                          name="wash"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td style={{ width: "8%" }}>
                        <input
                          type="number"
                          placeholder={dataRegulationsModelTable?.presure ?? "-"}
                          onChange={handleChangeInput}
                          name="presure"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td style={{ width: "8%" }}>
                        <input
                          type="number"
                          placeholder={dataRegulationsModelTable?.antiscalant ?? "-"}
                          onChange={handleChangeInput}
                          name="antiscalant"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td style={{ width: "8%" }}>
                        <input
                          type="number"
                          placeholder={dataRegulationsModelTable?.chemicalWash ?? "-"}
                          onChange={handleChangeInput}
                          name="chemicalWash"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td style={{ width: "8%" }}>
                        <input
                          type="number"
                          placeholder={dataRegulationsModelTable?.membrane ?? "-"}
                          onChange={handleChangeInput}
                          name="membrane"
                          style={{ width: "100px" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <input
                  type="button"
                  className="submit"
                  value="Сохранить"
                  onClick={() => openModal("ADD")}
                  style={{ margin: "10px auto", display: "block", cursor: "pointer" }}
                />
              </fieldset>
            </form>
          </div>
          <div
            style={{
              marginTop: "5vh",
              marginBottom: "5vh",
              textAlign: "left",
              float: "left ",
            }}
          >
            <p style={{ textAlign: "left", marginBottom: 0, margin: 0 }} className="section-title">
              Расходы по датам:
            </p>
          </div>
          <div style={{ float: "right" }}>
            <p className="section-title" style={{ margin: 0, marginTop: 30 }}>
              <label>
                <input
                  title="Расходы по датам: Фактические значения"
                  type="radio"
                  name="getExpenses"
                  checked={valueCheckBox === "getExpenses"}
                  onChange={changeRadioBtn}
                />
                Фактические значения
              </label>
            </p>
          </div>
          <div style={{ float: "right" }}>
            <p className="section-title" style={{ margin: 0, marginTop: 30 }}>
              <label>
                <input
                  title="Расходы по датам:Модель"
                  type="radio"
                  name="getModelExpenses"
                  checked={valueCheckBox === "getModelExpenses"}
                  onChange={changeRadioBtn}
                />
                Модель
              </label>
            </p>
          </div>
          <div>
            <table className="table-data">
              <tbody>
                <tr>
                  <th rowSpan={2} style={{ width: "11.1%" }}>
                    Дата
                  </th>
                  <th style={{ width: "33.3%" }} colSpan={3}>
                    Потоки, м3
                  </th>
                  <th style={{ width: "11.1%" }} rowSpan={2}>
                    Промывка
                  </th>
                  <th style={{ width: "11.1%" }} rowSpan={2}>
                    Электроэнергия, квтч
                  </th>
                  <th style={{ width: "11.1%" }} rowSpan={2}>
                    Антискалант, кг
                  </th>
                  <th style={{ width: "11.1%" }} colSpan={1} rowSpan={2}>
                    Химическая промывка, г
                  </th>
                  <th style={{ width: "11.1%" }} colSpan={1} rowSpan={2}>
                    Мембраны, шт
                  </th>
                </tr>
                <tr style={{ width: "33.3%" }} colSpan={3}>
                  <th colSpan={1}>Пермиат</th>
                  <th colSpan={1}>Дренаж</th>
                  <th colSpan={1}>Циркуляция</th>
                </tr>
              </tbody>
            </table>
            <ReactVirtualizedTable
              dataState={
                !!Object.keys(dataOnDayCosts).length ? getDataExpensesOnDates(dataOnDayCosts) : []
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
