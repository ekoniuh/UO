import * as React from "react";
import { useState } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// import Button from '@mui/material/Button';
// import { format, parse } from 'date-fns';

export function DatePicker({ date, name, changeDate, minDate, customStyle, maxDate }) {
  const [selectedDate, setDate] = useState(new Date(date));
  const minDateInput = minDate ? new Date(minDate) : null;
  const maxDateInput = maxDate ? new Date(maxDate) : null;
  const color = customStyle?.color ?? "#d8e4e8";
  const marginLeft = customStyle?.marginLeft ?? 5;

  function handleDateChange(date) {
    changeDate(date, name);
    setDate(date);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} ml={marginLeft}>
        <DesktopDatePicker
          // disabled={currentMonitoringCycle?.disableInputDate}
          label="Дата"
          inputFormat="dd/MM/yyyy"
          maxDate={maxDateInput}
          minDate={minDateInput}
          name={name}
          value={selectedDate}
          onChange={handleDateChange}
          color="secondary"
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                svg: { color },
                input: { color },
                label: { color },
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: color,
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
