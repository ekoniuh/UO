/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
// import { useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Box, Button } from "@mui/material";

export function SettingInstallation({indexCurrentComponent, nextComponent}) {
  
  return (
    <div className="container">
      {/* <CurrentComponent /> */}
      <Box justifyContent="space-between" alignItems="center" display="flex">
        <IconButton
          disabled={indexCurrentComponent !== 1}
          color="primary"
          name="back"
          onClick={nextComponent}
        >
          <ArrowBackIcon sx={{ fontSize: 50 }} />
        </IconButton>
        <Button
          sx={{ height: 40 }}
          variant="contained"
          endIcon={<ExitToAppIcon />}
          // onClick={handleFinishSetting}
        >
          Закончить настройку
        </Button>

        <IconButton
          // disabled={indexCurrentComponent === componentsPage.length - 1}
          color="primary"
          name="next"
          onClick={nextComponent}
        >
          <ArrowForwardIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </Box>
    </div>
  );
}
