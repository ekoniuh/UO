function createData(name, status, contact) {
  return {
    name,
    status,
    contact,
    history: [
      {
        name,
        status: "Работает",
        cost: "1300$",
        dateBuy: "2021-12-01",
        producer: "LG",
        contact: "+37533656565",
      },
    ],
  };
}

export const DATA_ROWS_TABLE = [
  createData("Coca-cola", "Без ошибок", "+37533656565"),
  // createData("Sprite", "Без ошибок", "+37533656565"),
  // createData("Fanta", "Без ошибок", "+37533656565"),
  // createData("Pepsi", "Без ошибок", "+37533656565"),
];

export const INITIAL_DATA_TABLE = [
  {
    name: "string",
    installations: [
      {
        id: 0,
        name: "string",
        status: "string",
        date: "2022-07-21T11:29:43.733Z",
        contacts: "string",
      },
    ],
  },
];

export const INITIAL_DATA_MODAL = {
  name: "",
  description: "",
  model: "",
  address: "",
  coordinates: "",
  isActive: true,
};
