export const CONFIG_TBODY_MEMBRANE = [
  ["Производительность (м3/ч)", "performance"],
  ["Производитель", "producer"],
  ["Удельный расход мембраны (шт/10000m3)", "rate"],
  ["Количество мембра (шт)", "amount"],
  ["Период замены (дней)", "serviceInterval"],
];

export const CONFIG_TBODY_MEMBRANE_WASH = [
  ["Прогнозируемый расход", "fiatureRate"],
  ["Текущий расход", "factRate"],
  ["Период замены (дней)", "serviceInterval"],
];

export const CONFIG_TBODY_SERVICE = [["Период осмотра", "viewInterval"]];

export const TITLE_MEMBRANE = "Мембраны:";

export const TITLE_MEMBRANE_WASH = "Химическая промывка мембран:";

export const TITLE_SERVICE = "Сервисный выезд";

export const INITIAL_DATA_TABLE_MEMBRANE = {
  amount: "-",
  id: "-",
  model: "-",
  performance: "-",
  producer: "-",
  rate: "-",
  serviceInterval: "-",
};

export const INITIAL_DATA_TABLE_MEMBRANE_WASH = {
  factRate: "-",
  id: "-",
  fiatureRate: "-",
  serviceInterval: "-",
};

export const INITIAL_DATA_TABLE_SERVICE = {
  viewInterval: "-",
};
