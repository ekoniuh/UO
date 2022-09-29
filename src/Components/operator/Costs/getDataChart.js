// import { configForLineChart } from './configForLineChartJS';
import { format } from "date-fns";
import { css } from "@emotion/react";

export const override = css`
  display: block;
  margin: 300px auto;
  border-color: red;
  width: 300px;
`;

export function getDataChart(dataState, isClickNormalizationBtn) {
  const isEmptyArray = dataState.length > 0;
  return {
    chart: {
      zoomType: "x",
      defaultSeriesType: "spline",
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
    series: [
      {
        name: "Вода дренаж, м3/м3",
        data: isEmptyArray ? dataState.map((item) => item.drain) : null,

        color: "#FF0000",
      },
      // {
      //   name: "Циркуляция, м3/м3",
      //   color: "#9900cc",
      // },
      {
        name: "Пермиат м3",
        data: isEmptyArray ? dataState.map((item) => item.ratePerm) : null,

        color: "#ff3399",
      },
      {
        name: "Элекроэнергия, квт*ч/ м3",
        data: isEmptyArray ? dataState.map((item) => item.electricity) : null,

        color: "#cc9900",
      },
      {
        name: "Антискалант, г/м3",
        data: isEmptyArray ? dataState.map((item) => item.antiscalant) : null,

        color: "#0000FF",
      },
      {
        name: "Вода промывка, м3/м3",
        data: isEmptyArray ? dataState.map((item) => item.wash) : null,

        color: "#339966",
      },
      {
        name: "Химические промывки, г/м3",
        data: isEmptyArray ? dataState.map((item) => item.chemicalWash) : null,

        color: "#9900cc",
      },
      {
        name: "Мембраны, шт/1000м3",
        data: isEmptyArray ? dataState.map((item) => item.membrane) : null,

        color: "#cc99FF",
      },
    ],
  };
}
