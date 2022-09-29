/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ReactVirtualizedTable } from "./VirtualTable";

import Grow from "@material-ui/core/Grow";
import { useSnackbar } from "notistack";
import { API_CONFIG } from "../../../constants";
import { DatePicker, getNotificationConfig, Loader } from "../../../helpers";
import { httpService } from "../../../services";
import { getDataChart } from "./getDataChart";

const initialPeriod = {
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
  endDate: new Date().toISOString(),
};

export function CostsOperator() {
  const { installationId } = useParams();

  document.title = "Расходы";
  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState();

  const [optionsForChart, setOptionsForChart] = useState();
  const [period, setPeriod] = useState({ startDate: "", endDate: "" });

  const [dataTotalCosts, setDataTotalCosts] = useState({});
  const [dataOnDayCosts, setDataOnDayCosts] = useState([]);

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
      setNotification(getNotificationConfig(responsePeriod.status, "для периода даты"));

      setPeriod({ startDate, endDate });
      setIsLoading(false);
    })();
  }, [installationId]);

  const loadDataPage = async ({ startDate, endDate }) => {
    const responseDataChart = await httpService.sendRequest(
      API_CONFIG.getRelativeExpenses(installationId, { startDate, endDate }).PATH
    ); // for chart
    const responseDataTotalCosts = await httpService.sendRequest(
      API_CONFIG.getTotalExpenses(installationId, { startDate, endDate }).PATH
    ); // суммарные расходы

    const responseDataOnDayCosts = await httpService.sendRequest(
      API_CONFIG.getExpenses(installationId, { startDate, endDate }).PATH
    ); // one day fact

    setDataTotalCosts(responseDataTotalCosts?.data ?? []);
    setDataOnDayCosts(responseDataOnDayCosts?.data ?? []);

    setOptionsForChart(getDataChart(responseDataChart?.data ?? []));

    setNotification(
      getNotificationConfig(responseDataOnDayCosts.status, "для таблицы Расходы по датам")
    );
    setNotification(
      getNotificationConfig(responseDataTotalCosts.status, "для таблицы суммарные расходы")
    );
    setNotification(getNotificationConfig(responseDataChart.status, "для графика"));
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

  async function handleClickBtnShow() {
    setIsLoading(true);
    await loadDataPage(period);
    setIsLoading(false);
  }

  function getDataExpensesOnDates(data) {
    data.forEach((item) => (item.date = format(new Date(item.date), "yyyy-MM-dd")));
    return data;
    // return data.map((item) => {
    //   item[valueCheckBox].date = format(new Date(item.date), "yyyy-MM-dd");
    //   return item[valueCheckBox];
    // });
  }

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="container">
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
                !!Object.keys(dataOnDayCosts).length
                  ? getDataExpensesOnDates([...dataOnDayCosts].reverse())
                  : []
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
