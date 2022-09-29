/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import Grow from "@material-ui/core/Grow";
import { getDataChart } from "./getDataChart";

import { useSnackbar } from "notistack";
import { API_CONFIG } from "../../../constants";
import { DatePicker, getNotificationConfig, Loader, Modal } from "../../../helpers/";
import { httpService } from "../../../services/";

const INITIAL_DATA_TABLE = {
  permiat: {},
  wash: {},
  electricity: {},
  antiscalant: {},
  membrane: {},
  drain: {},
  chemicalWash: {},
};

const initialPeriod = {
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
  endDate: new Date().toISOString(),
};

export function EconomicAnalysisOperator() {
  document.title = "Экономический анализ";
  const { installationId } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();
  // const [chartKey, setChartKey] = useState(Math.random().toString(16).slice(-4));

  const [optionsForChart, setOptionsForChart] = useState([]);
  const [period, setPeriod] = useState({ startDate: "", endDate: "" });

  const [dataTableSteams, setDataTableSteams] = useState({
    drain: 0,
    circulation: 0,
    electricity: 0,
    antiscalant: 0,
    membrane: 0,
    chemicalWash: 0,
  });
  const [dataTables, setDataTables] = useState(INITIAL_DATA_TABLE);

  const [isLoading, setIsLoading] = useState(true);
  const [typeModal, setTypeModal] = useState("ADD");

  const [isOpenModal, setIsOpenModal] = useState(false);

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

  useEffect(() => {
    const { electricity, antiscalant, membrane, drain, chemicalWash } = dataTables;

    setDataTableSteams({
      drain: drain.rate,
      circulation: 0,
      electricity: electricity.rate,
      antiscalant: antiscalant.rate,
      membrane: membrane.rate,
      chemicalWash: chemicalWash.rate,
    });
  }, [dataTables]);

  useEffect(() => {
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  const loadDataPage = async ({ startDate, endDate }) => {
    const responseDataChart = await httpService.sendRequest(
      API_CONFIG.getFactRelativeCosts(installationId, { startDate, endDate }).PATH
    );
    const responseDataTable = await httpService.sendRequest(
      API_CONFIG.getFactTotalCosts(installationId, { startDate, endDate }).PATH
    );

    setDataTables(responseDataTable?.data ?? INITIAL_DATA_TABLE);
    setOptionsForChart(getDataChart(responseDataChart?.data ?? []));

    setNotification(getNotificationConfig(responseDataChart.status, "для графика"));
    setNotification(getNotificationConfig(responseDataTable.status, "для таблиц"));
  };

  function handleChangeDate(date, name) {
    setPeriod({ ...period, [name]: new Date(format(new Date(date), "yyyy-MM-dd")).toISOString() });
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
      const { PATH, METHOD, HEADERS } = API_CONFIG.updateSourcesRates(installationId);
      const { status } = await httpService.sendRequest(PATH, METHOD, dataTableSteams, HEADERS);

      setNotification(getNotificationConfig(status));

      await loadDataPage(period);
      setIsLoading(false);
    })();
  }

  function changeInput({ target }) {
    setDataTableSteams({
      ...dataTableSteams,
      [target.name]: Number(target.value),
    });
  }

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = ({ target }) => {
    setTypeModal(target.name);
    setIsOpenModal(true);
  };

  const { permiat, wash, electricity, antiscalant, membrane, drain, chemicalWash } = dataTables;

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="container" style={{ display: "flex", flexDirection: "column" }}>
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

          <form
            className="section-title"
            style={{ marginTop: "9vh", marginBottom: 0, textAlign: "left" }}
          >
            <fieldset>
              <legend>Потоки:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th rowSpan={3} style={{ width: "15%", fontSize: "22px" }}>
                        <label>Пермиат </label>
                      </th>
                      <th>
                        <label>Стоимость, USD/м3</label>
                      </th>
                      <th>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th>
                        <label>Расход, м3</label>
                      </th>
                      <th>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.rate ?? "-"}
                      </td>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.permiatCost ?? "-"}
                      </td>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.amount ?? "-"}
                      </td>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.cost ?? "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th rowSpan={2}>
                        <label> </label>
                      </th>
                      <th colSpan={1} rowSpan={2}>
                        <label>Стоимость, USD/м3</label>
                      </th>
                      <th>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th>
                        <label>Расход, м3</label>
                      </th>
                      <th>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr></tr>

                    <tr>
                      <td style={{ width: "15%" }}>
                        <label> Дренаж </label>
                      </td>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="drain"
                          onChange={changeInput}
                          placeholder={drain?.rate ?? "-"}
                          min="0.001"
                          step="any"
                          style={{ textAlign: "center" }}
                        />
                      </td>
                      <td style={{ width: "15%" }}>{drain?.permiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{drain?.amount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{drain?.cost ?? "-"}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "15%" }}>
                        <label> Промывка </label>
                      </td>
                      <td style={{ width: "15%" }}>{wash?.rate ?? "-"}</td>
                      <td style={{ width: "15%" }}>{wash?.permiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{wash?.amount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{wash?.cost ?? "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
            <fieldset>
              <legend>Электроэнергия:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th rowSpan={2}>
                        <label> Стоимость, USD/квт*ч </label>
                      </th>
                      <th>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th>
                        <label>Расход, квт*ч</label>
                      </th>
                      <th>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr></tr>

                    <tr>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="electricity"
                          onChange={changeInput}
                          placeholder={electricity?.rate ?? "-"}
                          style={{ textAlign: "center" }}
                          min="0.001"
                          step="any"
                        />
                      </td>
                      <td style={{ width: "15%" }}>{electricity?.permiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{electricity?.amount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{electricity?.cost ?? "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
            <fieldset>
              <legend>Антискалант:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th rowSpan={2}>
                        <label> Стоимость, USD/кг </label>
                      </th>
                      <th>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th>
                        <label>Расход, кг</label>
                      </th>
                      <th>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="antiscalant"
                          onChange={changeInput}
                          placeholder={antiscalant?.rate ?? "-"}
                          style={{ textAlign: "center" }}
                          min="0.001"
                          step="any"
                        />
                      </td>
                      <td style={{ width: "15%" }}>{antiscalant?.permiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{antiscalant?.amount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{antiscalant?.cost ?? "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
            <fieldset>
              <legend>Мембраны:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th rowSpan={2}>
                        <label> Стоимость, USD/шт </label>
                      </th>
                      <th>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th>
                        <label>Расход, шт</label>
                      </th>
                      <th>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="membrane"
                          onChange={changeInput}
                          placeholder={membrane?.rate ?? "-"}
                          style={{ textAlign: "center" }}
                          min="0.001"
                          step="any"
                        />
                      </td>
                      <td style={{ width: "15%" }}>{membrane?.permiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{membrane?.amount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{membrane?.cost ?? "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
            <fieldset>
              <legend>Химические промывки:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th rowSpan={2}>
                        <label>Стоимость, USD/кг</label>
                      </th>
                      <th>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th>
                        <label>Расход, кг</label>
                      </th>
                      <th>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="chemicalWash"
                          onChange={changeInput}
                          placeholder={chemicalWash?.rate ?? "-"}
                          style={{ textAlign: "center" }}
                          min="0.001"
                          step="any"
                        />
                      </td>
                      <td style={{ width: "15%" }}>{chemicalWash?.permiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{chemicalWash?.amount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{chemicalWash?.cost ?? "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>

            <div>
              <table className="table-data">
                <tbody>
                  <tr>
                    <th>
                      <input
                        // disabled={dateEconomicCosts?.disableInputDate ?? false}
                        style={{ textAlign: "center" }}
                        type="button"
                        value="Сохранить"
                        name="ADD"
                        onClick={openModal}
                        className="submit"
                      />
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
