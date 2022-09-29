import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function ViewsDatePicker() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}  sx={{width: "160px"}}>
        <DesktopDatePicker
          views={["year"]}
          label="Выберите год"
          value={value}
          maxDate={new Date()}
          minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 3))}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                svg: { color: "#d8e4e8" },
                input: { color: "#d8e4e8" },
                label: { color: "#d8e4e8" },
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "#d8e4e8",
                  },
                },
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
