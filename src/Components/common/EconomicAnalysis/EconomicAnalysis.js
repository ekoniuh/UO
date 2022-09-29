/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { getDataChart } from "./getDataChart";
import Grow from "@material-ui/core/Grow";

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

export function EconomicAnalysis() {
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
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [typeModal, setTypeModal] = useState("ADD");

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
    if (!notification?.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 4000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  const loadDataPage = async ({ startDate, endDate }) => {
    const responseDataChart = await httpService.sendRequest(
      API_CONFIG.getAllRelativeCosts(installationId, { startDate, endDate }).PATH
    );
    const responseDataTable = await httpService.sendRequest(
      API_CONFIG.getAllTotalCosts(installationId, { startDate, endDate }).PATH
    );

    setDataTables(responseDataTable?.data ?? INITIAL_DATA_TABLE);
    setOptionsForChart(getDataChart(responseDataChart?.data ?? []));

    setNotification(getNotificationConfig(responseDataChart.status, "для графика"));
    setNotification(getNotificationConfig(responseDataTable.status, "для таблиц"));
  };

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
    const { name, value } = target;

    setDataTableSteams((prev) => ({ ...prev, [name]: Number(value) }));
  }

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = (type) => {
    setTypeModal(type);
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
                key={Math.random().toString(16).slice(-4)}
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
                key={Math.random().toString(16).slice(-4)}
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

          <form className="section-title" style={{ textAlign: "left" }}>
            <fieldset>
              <legend>Потоки:</legend>
              <div>
                <table className="table-data">
                  <tbody>
                    <tr>
                      <th rowSpan={3} style={{ width: "15%", fontSize: "22px" }}>
                        <label>Пермиат </label>
                      </th>
                      <th colSpan={2} rowSpan={1}>
                        <label>Стоимость USD/м3</label>
                      </th>

                      <th colSpan={2}>
                        <label>Расход, м3</label>
                      </th>
                      <th colSpan={2} rowSpan={1}>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                    </tr>
                    <tr>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.rateReglament ?? "-"}
                      </td>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.rateCurrent ?? "-"}
                      </td>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.amount ?? "-"}
                      </td>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.amount ?? "-"}
                      </td>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.costReglament ?? "-"}
                      </td>
                      <td style={{ width: "15%", background: "#ffcc00" }}>
                        {permiat?.costCurrent ?? "-"}
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
                      <th colSpan={2}>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, м3</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr>
                      {/* <th>
                    <label></label>
                  </th> */}
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                    </tr>
                    <tr>
                      <td style={{ width: "15%" }}>
                        <label> Дренаж </label>
                      </td>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="drain"
                          onChange={changeInput}
                          //  value={rateTable?.drain ?? "-"}
                          placeholder={dataTableSteams?.drain ?? "-"}
                          min="0.001"
                          step="any"
                        />
                      </td>
                      <td style={{ width: "15%" }}>{drain?.reglamentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{drain?.currentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{drain?.reglamentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{drain?.currentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{drain?.reglamentCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{drain?.currentCost ?? "-"}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "15%" }}>
                        <label> Промывка </label>
                      </td>
                      <td style={{ width: "15%" }}>{wash?.rate ?? "-"}</td>
                      <td style={{ width: "15%" }}>{wash?.reglamentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{wash?.currentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{wash?.reglamentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{wash?.currentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{wash?.reglamentCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{wash?.currentCost ?? "-"}</td>
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
                        <label>Стоимость, USD/квт*ч </label>
                      </th>
                      <th colSpan={2}>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, квт*ч</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                    </tr>

                    <tr>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="electricity"
                          onChange={changeInput}
                          placeholder={dataTableSteams?.electricity ?? "-"}
                          min="0.001"
                          step="any"
                        />
                      </td>
                      <td style={{ width: "15%" }}>{electricity?.reglamentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{electricity?.currentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{electricity?.reglamentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{electricity?.currentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{electricity?.reglamentCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{electricity?.currentCost ?? "-"}</td>
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
                      <th colSpan={2}>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, кг</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                    </tr>
                    <tr>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="antiscalant"
                          onChange={changeInput}
                          placeholder={dataTableSteams?.antiscalant ?? "-"}
                          min="0.001"
                          step="any"
                        />
                      </td>
                      <td style={{ width: "15%" }}>{antiscalant?.reglamentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{antiscalant?.currentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{antiscalant?.reglamentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{antiscalant?.currentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{antiscalant?.reglamentCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{antiscalant?.currentCost ?? "-"}</td>
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
                      <th colSpan={2}>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, шт</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                    </tr>
                    <tr>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="membrane"
                          onChange={changeInput}
                          placeholder={dataTableSteams?.membrane ?? "-"}
                          min="0.001"
                          step="any"
                        />
                      </td>
                      <td style={{ width: "15%" }}>{membrane?.reglamentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{membrane?.currentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{membrane?.reglamentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{membrane?.currentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{membrane?.reglamentCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{membrane?.currentCost ?? "-"}</td>
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
                      <th colSpan={2}>
                        <label>Затраты на пермиат, USD/м3</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, кг</label>
                      </th>
                      <th colSpan={2}>
                        <label>Расход, USD</label>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                      <th>
                        <label>Регламент</label>
                      </th>
                      <th>
                        <label>Фактический</label>
                      </th>
                    </tr>
                    <tr>
                      <td style={{ width: "15%" }}>
                        <input
                          type="number"
                          name="chemicalWash"
                          onChange={changeInput}
                          placeholder={dataTableSteams?.chemicalWash ?? "-"}
                          min="0.001"
                          step="any"
                        />
                      </td>
                      <td style={{ width: "15%" }}>{chemicalWash?.reglamentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{chemicalWash?.currentPermiatCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{chemicalWash?.reglamentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{chemicalWash?.currentAmount ?? "-"}</td>
                      <td style={{ width: "15%" }}>{chemicalWash?.reglamentCost ?? "-"}</td>
                      <td style={{ width: "15%" }}>{chemicalWash?.currentCost ?? "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>

            <div className="table-data" style={{ margin: "0 auto", display: "block" }}>
              <input
                // disabled={dateEconomicCosts?.disableInputDate ?? false}
                style={{ margin: "0 auto", display: "block" }}
                type="button"
                value="Сохранить"
                className="submit"
                onClick={() => openModal("ADD")}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
