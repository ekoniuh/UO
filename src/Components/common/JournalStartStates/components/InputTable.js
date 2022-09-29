import { format } from "date-fns";
import SaveIcon from "@mui/icons-material/Save";

export const InputTable = ({
  data,
  name,
  index,
  openModal,
  actionSave,
  objectForSave,
  changeDataForSave,
}) => {
  return (
    <td
      key={index + name}
      style={{
        background: "#8093b7",
        color: "#000",
      }}
    >
      {name === "date" ? (
        format(new Date(data), "dd-MM-yyyy")
      ) : name === "drain" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <input
            type="number"
            style={{
              textAlign: "center",
              width: "50%",
              background: "none",
              border: "none",
              fontSize: "12px",
              fontWeight: "bold",
              marginRight: 10,
            }}
            name={name}
            size="5"
            className="current-start-state"
            onChange={changeDataForSave}
            placeholder={data}
          />
          <SaveIcon
            onClick={() => openModal("SAVE", objectForSave, index, actionSave)}
            name="SAVE"
            sx={{ cursor: "pointer", color: "green" }}
          />
        </div>
      ) : name === "calculationType" ? (
        data
      ) : (
        <input
          type="number"
          style={{
            textAlign: "center",
            width: "50%",
            background: "none",
            border: "none",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          name={name}
          size="5"
          className="current-start-state"
          onChange={changeDataForSave}
          placeholder={data}
        />
      )}
    </td>
  );
};
