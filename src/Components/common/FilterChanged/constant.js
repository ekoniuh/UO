import { format } from "date-fns";

export const DATA_FOR_ADD = {
  date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  id: 0,
  message: "",
  type: "FilterChanged",
};
