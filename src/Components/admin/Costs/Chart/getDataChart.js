// import { configForLineChart } from './configForLineChartJS';
import { format } from "date-fns";
import { css } from "@emotion/react";

export const override = css`
  display: block;
  margin: 300px auto;
  border-color: red;
  width: 300px;
`;

export function getDataChart(dataState) {
  const isEmptyArray = dataState.length > 0;

  return {
    chart: {
      zoomType: "x",
      defaultSeriesType: "spline",
      height: 600,
      backgroundColor: "rgba(220, 220, 220, 255)",
    },
    title: {
      text: "Удельные расходы по отношению к пермиату",
    },
    xAxis: {
      categories: isEmptyArray
        ? dataState.map((item) => format(new Date(item.date), "yyyy-MM-dd"))
        : null,
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Данные",
      },
    },
    legend: {
      layout: "horisontal",
      verticalAlign: "middle",
      align: "right",
      useHTML: true,
      labelFormatter: function () {
        return `<div style="width: 100%; display:inline-block;margin-bottom: ${
          (this.index && !(this.index % 2)) || this.index === 1 ? "20px" : "none"
        };">
          <div style="float:left; font-size:14px; font-weight:normal" >${this.name}</div>
          </div>`;
      },
      // symbolRadius: 2,
      // layout: "vertical",
      // alignColumns: false,
      // maxHeight: 100,
      // maxWidth: 1800,
      // width: "100%",
      // verticalAlign: "middle",
      // align: "right",
      // itemWidth: 250,
      // itemCheckboxStyle: {"width": "33px", "height": "20px", "position":"absolute"},
      // itemDistance:0,
      // borderWidth: 3,
    },

    series: [
      {
        name: "Пермиат м3",
        color: "#ff3399",
        data: isEmptyArray ? dataState.map((item) => item["factExpenses"].ratePerm) : null,
      },
      {
        name: "Вода дренаж, м3/м3",
        color: "#FF0000",
        data: isEmptyArray ? dataState.map((item) => item["factExpenses"].drain) : null,
      },
      {
        name: "Вода дренаж, м3/м3(модель)",
        color: "#FF0000",
        data: isEmptyArray ? dataState.map((item) => item["modelExpenses"].drain) : null,

        dashStyle: "longdash",
      },

      {
        name: "Элекроэнергия, квт*ч/ м3",
        color: "#cc9900",
        data: isEmptyArray ? dataState.map((item) => item["factExpenses"].electricity) : null,
      },
      {
        name: "Элекроэнергия, квт*ч/ м3(модель)",
        color: "#cc9900",
        data: isEmptyArray ? dataState.map((item) => item["modelExpenses"].electricity) : null,

        dashStyle: "longdash",
      },
      {
        name: "Антискалант, г/м3",
        color: "#0000FF",
        data: isEmptyArray ? dataState.map((item) => item["factExpenses"].antiscalant) : null,
      },
      {
        name: "Антискалант, г/м3(модель)",
        color: "#0000FF",
        data: isEmptyArray ? dataState.map((item) => item["modelExpenses"].antiscalant) : null,

        dashStyle: "longdash",
      },
      {
        name: "Вода промывка, м3/м3",
        color: "#339966",
        data: isEmptyArray ? dataState.map((item) => item["factExpenses"].wash) : null,
      },
      {
        name: "Вода промывка, м3/м3(модель)",
        color: "#339966",
        data: isEmptyArray ? dataState.map((item) => item["modelExpenses"].wash) : null,

        dashStyle: "longdash",
      },
      {
        name: "Химические промывки, г/м3",
        color: "#9900cc",
        data: isEmptyArray ? dataState.map((item) => item["factExpenses"].chemicalWash) : null,
      },
      {
        name: "Химические промывки, г/м3(модель)",
        color: "#9900cc",
        data: isEmptyArray ? dataState.map((item) => item["modelExpenses"].chemicalWash) : null,

        dashStyle: "longdash",
      },
      {
        name: "Мембраны, шт/10000 м3",
        color: "#cc99FF",
        data: isEmptyArray ? dataState.map((item) => item["factExpenses"].membrane) : null,
      },
      {
        name: "Мембраны, шт/10000 м3(модель)",
        color: "#cc99FF",
        data: isEmptyArray ? dataState.map((item) => item["modelExpenses"].membrane) : null,

        dashStyle: "longdash",
      },
    ],
  };
}
