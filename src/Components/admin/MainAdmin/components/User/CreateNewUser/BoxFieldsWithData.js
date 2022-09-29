import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

export function BoxFieldsWithData({
  dataUser,
  showPassword,
  clickShowPassword,
  changeDataUser,
  helperTextEmail,
  errorEmail,
}) {
  return (
    <Stack
      sx={{ width: "50%" }}
      mb={5}
      m={"auto"}
      mt={2}
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={2}
    >
      <TextField
        id="outlined"
        // error={!dataUser.name}
        // helperText={!dataUser.name ? "Поле обязательно к заполнению" : ""}
        label="Имя"
        size="small"
        sx={{ width: "100%" }}
        name="name"
        value={dataUser.name}
        onChange={changeDataUser}
      />
      <TextField
        id="outlined"
        error={errorEmail}
        label="Почта"
        helperText={helperTextEmail}
        size="small"
        sx={{ width: "100%" }}
        name="email"
        type="email"
        value={dataUser.email}
        onChange={changeDataUser}
      />
      <TextField
        autoComplete="new-password"
        id="outlined"
        error={!dataUser.pass}
        label="Пароль"
        helperText={!dataUser.pass ? "Поле обязательно к заполнению" : ""}
        size="small"
        sx={{ width: "100%" }}
        name="pass"
        type={showPassword ? "text" : "password"}
        value={dataUser.pass}
        onChange={changeDataUser}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={clickShowPassword}
                // onMouseDown={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
