import { format } from "date-fns";

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
      text: "Анализ затрат на производство пермиата",
    },
    xAxis: {
      categories: isEmptyArray
        ? dataState.map((item) => format(new Date(item.date), "yyyy-MM-dd"))
        : null,
      type: "datetime",
      // labels: {
      //     formatter: function () {
      //         return Highcharts.dateFormat('dd-MM-yyyy', this.value);
      //     }
      // }
    },
    //   tooltip: {
    //     formatter: function () {
    //       console.log(`this.points`, this.points);
    //         // return this.key;
    //     },
    //     shared: true
    // },
    //   tooltip: {
    //     formatter: function () {
    //         return this.points.reduce(function (s, point) {
    //             return s + '<br/>' + point.series.name + ': ' +
    //                 point.y + 'm';
    //         }, '<b>' + this.x + '</b>');
    //     },
    //     shared: true
    // },
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
          this.index % 2 || this.index === 1 ? "20px" : "none"
        };">
        <div style="float:left; font-size:14px; font-weight:normal" >${this.name}</div>
        </div>`;
      },
    },
    series: [
      {
        name: "Пермиат, USD/м3",
        data: isEmptyArray ? dataState.map((item) => item["factCost"].permiat) : null,
        color: "#ff3399",
      },
      {
        name: "Пермиат, USD/м3(модель)",
        data: isEmptyArray ? dataState.map((item) => item["modelCost"].permiat) : null,
        dashStyle: "longdash",
        color: "#ff3399",
      },
      {
        name: "Вода дренаж, USD/м3",
        data: isEmptyArray ? dataState.map((item) => item["factCost"].drain) : null,
        color: "#FF0000",
      },
      {
        name: "Вода дренаж, USD/м3(модель)",
        data: isEmptyArray ? dataState.map((item) => item["modelCost"].drain) : null,
        dashStyle: "longdash",
        color: "#FF0000",
      },
      {
        name: "Элекроэнергия, USD/м3",
        data: isEmptyArray ? dataState.map((item) => item["factCost"].electricity) : null,
        color: "#cc9900",
      },
      {
        name: "Элекроэнергия, USD/м3(модель)",
        data: isEmptyArray ? dataState.map((item) => item["modelCost"].electricity) : null,
        dashStyle: "longdash",
        color: "#cc9900",
      },
      {
        name: "Антискалант, USD/м3",
        data: isEmptyArray ? dataState.map((item) => item["factCost"].antiscalant) : null,
        color: "#0000FF",
      },
      {
        name: "Антискалант, USD/м3(модель)",
        data: isEmptyArray ? dataState.map((item) => item["modelCost"].antiscalant) : null,
        dashStyle: "longdash",
        color: "#0000FF",
      },
      {
        name: "Вода промывка, USD/м3",
        data: isEmptyArray ? dataState.map((item) => item["factCost"].wash) : null,
        color: "#339966",
      },
      {
        name: "Вода промывка, USD/м3(модель)",
        data: isEmptyArray ? dataState.map((item) => item["modelCost"].wash) : null,
        dashStyle: "longdash",
        color: "#339966",
      },
      {
        name: "Химические промывки, USD/м3",
        data: isEmptyArray ? dataState.map((item) => item["factCost"].chemicalWash) : null,
        color: "#9900cc",
      },
      {
        name: "Химические промывки, USD/м3(модель)",
        data: isEmptyArray ? dataState.map((item) => item["modelCost"].chemicalWash) : null,
        dashStyle: "longdash",
        color: "#9900cc",
      },
      {
        name: "Мембраны, USD/м3",
        data: isEmptyArray ? dataState.map((item) => item["factCost"].membrane) : null,
        color: "#cc99FF",
      },
      {
        name: "Мембраны, USD/м3(модель)",
        data: isEmptyArray ? dataState.map((item) => item["modelCost"].membrane) : null,
        dashStyle: "longdash",
        color: "#cc99FF",
      },
    ],
  };
}
