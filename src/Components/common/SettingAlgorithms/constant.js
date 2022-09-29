export const CONFIG_TBODY_START_STATE = [
  {
    nameData: "startStateParam",
    legend: "Параметры вычисления стартовых состояний:",
    table: [
      {
        thead: {
          title: "Не учитываемый временной интервал после старта",
          colSpan: 2,
        },
        tbody: [
          {
            title: "Пропустить дней:",
            nameValue: "skipDays",
          },
          {
            title: "Пропустить не менее:",
            nameValue: "skipHours",
          },
        ],
      },
    ],
  },
];
export const CONFIG_TBODY_RINSING_STATE = {};
