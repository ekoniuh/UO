import { format } from "date-fns";

export const DATA_FOR_ADD = {
  date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  id: 0,
  message: "",
  type: "RemoteView",
};

export const TITLE_TABLE = {
  replacingMembrane: "Стартовые значения после замены мембран",
  washingMembrane: "Стартовые значения после промывки мембран",
};

export const CONFIG_THEAD_TITLE = [
  "Дата",
  "Tемпература, °C",
  "Давление вход, бар",
  "Дифференциальное давление, бар",
  "Давление пермиат, бар",
  "Проводимость вход, uSm",
  "Проводимость Пермиат, uSm",
  "Пермиат, м3/ч",
  "Дренаж, м3/ч",
  "Тип",
];

export const CONFIG_TBODY = [
  "date",
  "tempWater",
  "p3",
  "deltaP2",
  "pperm",
  "conductivityPerm",
  "reserv2",
  "ratePerm",
  "drain",
  "calculationType",
];

export const INITIAL_DATA_FOR_ADD = {
  id: 0,
  calculationType: "",
  circulation: 0,
  conductivityPerm: 0,
  date: "",
  deltaP1: 0,
  deltaP2: 0,
  drain: 0,
  p1: 0,
  p2: 0,
  p3: 0,
  p4: 0,
  pperm: 0,
  ratePerm: 0,
  reserv2: 0,
  reserv3: 0,
  tempWater: 0,
  type: "",
};
