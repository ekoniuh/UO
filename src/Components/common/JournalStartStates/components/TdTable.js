import { format } from "date-fns";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const TdTable = ({ cell, data, name, index, openModal, actionDelete }) => {
  const value =
    name === "date" ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DeleteForeverIcon
          onClick={() => openModal("DELETE", data, index, actionDelete)}
          // id={id}
          name="DELETE"
          sx={{ cursor: "pointer", color: "blue" }}
        />
        {format(new Date(cell), "dd-MM-yyyy")}
      </div>
    ) : (
      cell
    );

  return <td key={index + name}>{value}</td>;
};
