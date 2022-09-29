export const CONFIG_TBODY_MEMBRANE = [
  ["Производительность (м3/ч)", "performance"],
  ["Производитель", "producer"],
  ["Удельный расход мембраны (шт/10000m3)", "rate"],
  ["Количество мембра (шт)", "amount"],
];

export const CONFIG_TBODY_MEMBRANE_WASH = [
  ["Прогнозируемый расход", "fiatureRate"],
  ["Текущий расход", "factRate"],
];

export const TITLE_MEMBRANE = "Мембраны:";

export const TITLE_MEMBRANE_WASH = "Химическая промывка мембран:";

export const INITIAL_DATA_TABLE_SERVICE = {
  membraneChange: {
    lastEvent: "",
    nextReglamentEvent: "",
    nextPredictEvent: "",
  },
  chemicalWash: {
    lastEvent: "",
    nextReglamentEvent: "",
    nextPredictEvent: "",
  },
  serviceView: {
    lastEvent: "",
    nextReglamentEvent: "",
  },
};
