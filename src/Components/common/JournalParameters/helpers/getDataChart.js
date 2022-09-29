// import { format } from "date-fns";
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
      text: "График:",
    },
    xAxis: {
      categories: isEmptyArray ? dataState.map((item) => item.date) : null,
      type: "datetime",
    },

    yAxis: {
      title: {
        text: "Данные",
      },
    },
    series: [
      {
        name: "Температура, °С",
        data: isEmptyArray ? dataState.map((item) => item.tempWater) : null,
        color: "#FF0000",
        visible: !isClickNormalizationBtn,
      },
      {
        name: "Давление до мембран, Bar",
        data: isEmptyArray ? dataState.map((item) => item.p3) : null,
        visible: !isClickNormalizationBtn,
        color: "#9900cc",
      },
      {
        name: "Давление после мембран, Bar",
        data: isEmptyArray ? dataState.map((item) => item.p4) : null,
        visible: !isClickNormalizationBtn,
        color: "#ff3399",
      },
      {
        name: "Давление после предфильтра, Bar",
        data: isEmptyArray ? dataState.map((item) => item.p1) : null,
        visible: !isClickNormalizationBtn,
        color: "#cc9900",
      },
      {
        name: "Проводимость, uSm",
        data: isEmptyArray ? dataState.map((item) => item.conductivityPerm) : null,
        color: "#0000FF",
      },
      {
        name: "Пермиат, <sup>м<sup>3</sup></sup>/<sub>ч</sub>",
        data: isEmptyArray ? dataState.map((item) => item.ratePerm) : null,
        color: "#339966",
      },
      {
        name: "Дренаж, <sup>м<sup>3</sup></sup>/<sub>ч</sub>",
        data: isEmptyArray ? dataState.map((item) => item.drain) : null,
        visible: !isClickNormalizationBtn,
        color: "#00ffff",
      },
      {
        name: "Перепад, Bar",
        data: isEmptyArray ? dataState.map((item) => item.deltaP2) : null,
        color: "#cc99FF",
      },
      {
        name: "Давление перед предфильтром, Bar",
        data: isEmptyArray ? dataState.map((item) => item.p2) : null,
        visible: !isClickNormalizationBtn,
        color: "#3399ff",
      },
    ],
  };
}
