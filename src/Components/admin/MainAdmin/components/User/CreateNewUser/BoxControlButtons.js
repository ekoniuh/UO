import { Box } from "@material-ui/core";
import Button from "@mui/material/Button";
import React from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

const styleBtn = {
  display: "flex",
  justifyContent: "space-around",
  width: " 80%",
  margin: "16px auto",
};

export function BoxControlButtons({ resetFields, isLoading, disabledBtn, sendDataUser }) {
  return (
    <Box sx={styleBtn}>
      <Button variant="outlined" startIcon={<HighlightOffIcon />} onClick={resetFields}>
        Отменить
      </Button>
      <LoadingButton
        endIcon={<SendIcon />}
        loading={isLoading}
        size="small"
        disabled={disabledBtn}
        variant="contained"
        name="next"
        onClick={sendDataUser}
      >
        {!isLoading && "Создать"}
      </LoadingButton>
    </Box>
  );
}
