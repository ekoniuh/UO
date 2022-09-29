export const CONFIG_TBODY_DATA_TABLE_ANTISCALANT = [
  // ["Сигнал с установки", ""],
  ["Дозировка гр/м3", "dosage"],
  ["Плотность", "consistence"],
  ["Производитель", "producer"],
  ["Наименование", "nomination"],
  ["Формула", "formula"],
];

export const INITIAL_DATA_MODAL_ANTISCALANT = {
  id: 0,
  isExist: true,
  consistence: 0,
  dosage: 0,
  producer: "",
  nomination: "",
  formula: "",
};

export const INITIAL_DATA_MODAL_PUMP = {
  id: 0,
  model: "",
  producer: "",
  efficiency: 0,
  workingPoint: 0,
  convertor: "",
};

export const INITIAL_DATA_MODAL_INST = {
  name: "",
  description: "",
  model: "",
  address: "",
  coordinates: "",
  isActive: true,
};
