import { Box, Typography } from "@material-ui/core";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Divider, Stack } from "@mui/material";
import React from "react";
import {
  checkChar,
  checkLength,
  checkLower,
  checkNumber,
  checkUpper,
} from "./helpers/checkPassWord";

const CONFIG = [
  [checkLength, "Не менее 8 символов"],
  [checkNumber, " 1 цифра"],
  [checkChar, "1 специальный символ"],
  [checkLower, "1 буква в нижнем регистре"],
  [checkUpper, "1 буква в верхнем регистре"],
];

export function RecommendationForPassword({ pass }) {
  return (
    <Stack
      divider={<Divider orientation="horizontal" flexItem />}
      sx={{ width: "39%", justifyContent: "center", margin: "10px auto" }}
    >
      {CONFIG.map(([nameFunction, title]) => (
        <Box sx={{ display: "flex", opacity: nameFunction(pass) ? 1 : 0.5 }} key={title}>
          {pass && nameFunction(pass) ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
          <Typography component="h5">{title}</Typography>
        </Box>
      ))}
    </Stack>
  );
}
