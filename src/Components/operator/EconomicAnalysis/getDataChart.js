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
  // debugger;
  if (!dataState || !Object.keys(dataState).length) {
    return {
      chart: {
        zoomType: "x",
        defaultSeriesType: "spline",
        backgroundColor: "rgba(220, 220, 220, 255)",
      },
      title: {
        text: "Анализ затрат на производство пермиата",
      },
      xAxis: {
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "Данные",
        },
      },
      series: [
        {
          name: "Вода дренаж, USD/м3",
          color: "#FF0000",
        },
        // {
        //   name: "Циркуляция, м3/м3",
        //   color: "#9900cc",
        // },
        {
          name: "Пермиат, USD/м3",
          color: "#ff3399",
        },
        {
          name: "Элекроэнергия, USD/м3",
          color: "#cc9900",
        },
        {
          name: "Антискалант, USD/м3",
          color: "#0000FF",
        },
        {
          name: "Вода промывка, USD/м3",
          color: "#339966",
        },
        {
          name: "Химические промывки, USD/м3",
          color: "#9900cc",
        },
        {
          name: "Мембраны, USD/м3",
          color: "#cc99FF",
        },
      ],
    };
  }

  // dataState = [...dataState].reverse();
  return {
    chart: {
      zoomType: "x",
      defaultSeriesType: "spline",
      backgroundColor: "rgba(220, 220, 220, 255)",
    },
    title: {
      text: "Анализ затрат на производство пермиата",
    },
    xAxis: {
      categories: dataState.map((item) =>
        format(new Date(item.date), "yyyy-MM-dd")
      ),
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
    series: [
      {
        name: "Вода дренаж, USD/м3",
        data: dataState.map((item) => item.drain),
        color: "#FF0000",
        // dashStyle: 'longdash',
        marker: {
          // enabled: true,
          // radius: middlestates === 'middlestates' ? 4 : 2,
        },
        visible: !isClickNormalizationBtn,
      },
      // {
      //   name: "Циркуляция, м3/м3",
      //   data: dataState.map((item) => item.circulation),
      //   visible: !isClickNormalizationBtn,
      //   color: "#9900cc",
      //   // dashStyle: 'longdash',
      //   marker: {
      //     // enabled: true,
      //     // radius: middlestates === 'middlestates' ? 4 : 2,
      //   },
      // },
      {
        name: "Пермиат, USD/м3",
        data: dataState.map((item) => item.ratePerm),
        visible: !isClickNormalizationBtn,
        marker: {
          // enabled: true,
          // radius: middlestates === 'middlestates' ? 4 : 2,
        },
        color: "#ff3399",
      },
      {
        name: "Элекроэнергия, USD/м3",
        data: dataState.map((item) => item.electricity),
        visible: !isClickNormalizationBtn,
        marker: {
          // enabled: true,
          // radius: middlestates === 'middlestates' ? 4 : 2,
        },
        color: "#cc9900",
      },
      {
        name: "Антискалант, USD/м3",
        data: dataState.map((item) => item.antiscalant),
        marker: {
          // enabled: true,
          // radius: middlestates === 'middlestates' ? 4 : 2,
        },
        color: "#0000FF",
      },
      {
        name: "Вода промывка, USD/м3",
        data: dataState.map((item) => item.wash),
        marker: {
          // enabled: true,
          // radius: middlestates === 'middlestates' ? 4 : 2,
        },
        color: "#339966",
      },
      {
        name: "Химические промывки, USD/м3",
        data: dataState.map((item) => item.chemicalWash),
        visible: !isClickNormalizationBtn,
        marker: {
          // enabled: true,
          // radius: middlestates === 'middlestates' ? 4 : 2,
        },
        color: "#9900cc",
      },
      {
        name: "Мембраны, USD/м3",
        data: dataState.map((item) => item.membrane),
        marker: {
          // enabled: true,
          // radius: middlestates === 'middlestates' ? 4 : 2,
        },
        color: "#cc99FF",
      },
    ],
  };
}
