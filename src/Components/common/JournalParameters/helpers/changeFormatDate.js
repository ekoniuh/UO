import { format } from "date-fns";

export const changeFormatDate = (data) => {
  if (!(data.length > 0)) return [];
  const dataTable = Array.from(data);
  console.log(dataTable === data);
  return dataTable.reverse().map((itemArray) => {
    Object.keys(itemArray).forEach((cell) => {
      if (itemArray[cell] === 0 || cell === "deltaP1") {
        itemArray[cell] = "-";
      }
      if (cell === "date") {
        itemArray[cell] = format(new Date(itemArray[cell]), "dd-MM-yyyy");
      }
    });
    return itemArray;
  });
};
