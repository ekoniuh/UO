// import * as React from "react";
import React, { useState } from "react";
// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// // import DateTimePicker from "@mui/lab/DateTimePicker";
// import ruLocale from "date-fns/locale/ru";
// // import Button from '@mui/material/Button';
// import { format, parse } from "date-fns";
import DatePicker from "react-datepicker";
import "./styles.css";

import "react-datepicker/dist/react-datepicker.css";

// // export function DatePicker({ date, minDate, maxDate, changeDate }) {
// function changeDate1(event) {
//   console.log("event :>> ", event);
// }
// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <Stack spacing={3} ml={10}>
// //         <DesktopDatePicker
// //         // onClose
// //           label="Дата"
// //           inputFormat="dd/MM/yyyy"
// //           maxDateTime={new Date(maxDate)}
// //           minDateTime={new Date(minDate)}
// //           value={date}
// //           onChange={(event) => changeDate1(event)}
// //           renderInput={(params) => <TextField {...params} />}
// //         />
// //       </Stack>
// //     </LocalizationProvider>
// //   );
// // }

// export function DatePicker({ date, minDate, maxDate, changeDate }) {
//   const [value, setValue] = React.useState(new Date());

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
//       <DateTimePicker
//         variant="dialog"
//         renderInput={(props) => (
//           <TextField {...props} />
//         )}
//         label="Дата"
//         ampm={false}
//         inputFormat="dd/MM/yyyy HH:mm"
//         maxDateTime={new Date(maxDate)}
//         minDateTime={new Date(minDate)}
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//       />
//       {/* <TimePicker
//         variant="dialog"
//         renderInput={(props) => (
//           <TextField {...props} />
//         )}
//         label="Дата"
//         ampm={false}
//         inputFormat="dd/MM/yyyy HH:mm"
//         maxDateTime={new Date(maxDate)}
//         minDateTime={new Date(minDate)}
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }} */}
//       />
//     </LocalizationProvider>
//   );
// }

export function DateTimePicker({ date, minDate, maxDate, changeDate }) {
  const [startDate, setStartDate] = useState(new Date());
  // console.log('format(new Date(maxDate), "yyyy-MM-ddHH:mm") :>> ', format(new Date(maxDate), "yyyy-MM-dd'T'HH:mm"));
  // console.log('startDate :>> ', startDate);
  // const [startDate, setStartDate] = useState(format(new Date(maxDate), "yyyy-MM-dd'T'HH:mm"));
  // const [startDate, setStartDate] = useState(
  //   setHours(setMinutes(new Date(), 30), 17)
  // );
  // console.log('startDate :>> ', startDate);
  return (
    <DatePicker
      excludeOutOfBoundsTimes
      selected={startDate}
      // defaultValue={new Date(maxDate)}
      dateFormat="dd/MM/yyyy HH:mm"
      onChange={(date) => {
        setStartDate(date);
      }}
      // minDate={new Date(minDate)}
      // maxDate={new Date(maxDate)}
      // minTime={'2022-04-06T10:45:59.158Z'}
      // maxTime='22:00'
      // maxTime={'2022-04-06T20:45:59.158Z'}
      // minTime={new Date(minDate)}
      // // maxTime='22:00'
      // maxTime={new Date(maxDate)}
      timeInputLabel="Дата"
      // showTimeSelect
      // locale="ru"
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={1}
      // dateFormat="Pp"
    />
  );
}
