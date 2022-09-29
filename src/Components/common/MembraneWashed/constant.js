export const INITIAL_DATA_TABLE = {
  id: 0,
  date: new Date(),
  acidProduser: "",
  alkaliProduser: "",
  biocideProduser: "",
  otherProduser: "",
  acidCount: 0,
  alkaliCount: 0,
  biocideCount: 0,
  otherCount: 0,
  acidFormula: "",
  alkaliFormula: "",
  biocideFormula: "",
  otherFormula: "",
};

export const CONFIG_MAIN_TABLE = [
  // ["Кислая", ["acidProduser", "acidCount", "acidFormula", "acidFormula"]],
  ["Щелочная", ["alkaliProduser", "alkaliFormula", "alkaliCount"]],
  ["Биоцид", ["biocideProduser", "biocideFormula", "biocideCount"]],
  ["Другая", ["otherProduser", "otherFormula", "otherCount"]],
];

export const OBJECT_DATA_DELETE = {
  id: 0,
  date: "",
  message: "string",
  type: "string",
};

export const INITIAL_PERIOD = {
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
  endDate: new Date().toISOString(),
};
