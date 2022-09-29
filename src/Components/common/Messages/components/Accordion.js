import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format } from "date-fns";
// import MarkunreadIcon from "@mui/icons-material/Markunread";
// import DraftsIcon from "@mui/icons-material/Drafts";
import { API_CONFIG } from "../../../../constants";
import { httpService } from "../../../../services";
import { Box, TextField } from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@material-ui/core/styles";

const CssTextField = styled(TextField)({
  "& .MuiAccordionSummary-root": {
    width: "100%",
    padding: "0px 16px",
  },
  "& .MuiInput-root": {
    borderBottomColor: "white",
  },
  "& label": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:hover": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderBottomColor: "white",
    },
    "&:hover fieldset": {
      borderBottomColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderBottomColor: "white",
    },
  },
});

export const AccordionWithMessages = ({ dataMessages, installationId }) => {
  // const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [arraySeenMessage, setArraySeenMessage] = useState([]);

  const seenMessage = async (messageId) => {
    const { PATH, METHOD, HEADERS } = API_CONFIG.seenMessage(installationId, messageId);
    const response = await httpService.sendRequest(PATH, METHOD, HEADERS);

    if (response.status === "update") {
      setArraySeenMessage((prev) => [...prev, messageId]);
    }
  };

  const filterData = (query, data) =>
    data.filter((message) => {
      // if (!query) return true;

      const queryLowerCase = query.toLowerCase();
      return (
        !query ||
        message.date?.toLowerCase().indexOf(queryLowerCase) !== -1 ||
        message.code?.toLowerCase().indexOf(queryLowerCase) !== -1 ||
        message.title?.toLowerCase().indexOf(queryLowerCase) !== -1
      );
      // if (message.code) {
      // if (
      //   message.date?.toLowerCase().indexOf(queryLowerCase) !== -1 ||
      //   message.code?.toLowerCase().indexOf(queryLowerCase) !== -1 ||
      //   message.title?.toLowerCase().indexOf(queryLowerCase) !== -1
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
      // } else {
      //   if (
      //     message.date?.indexOf(queryLowerCase) !== -1 ||
      //     message.title?.indexOf(queryLowerCase) !== -1
      //   ) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }
    });

  const showMessage = (messageId) => {
    seenMessage(messageId);
    setExpanded(expanded === messageId ? false : messageId);
  };

  const dataFiltered = filterData(searchQuery, dataMessages);

  return (
    <div className="container">
      <Box mb={2} mr={1} sx={{ display: "flex", justifyContent: "end" }}>
        <CssTextField
          id="standard-search"
          label="Поиск"
          type="search"
          variant="standard"
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon sx={{ color: "white" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {dataFiltered.map((message) => (
        <Accordion
          key={message.id}
          expanded={expanded === message.id}
          // onChange={readMessage(message.id)}
          sx={{
            color: "black",
            "& .MuiAccordionSummary-root": {
              width: "100%",
              padding: "0px 16px",
            },
            "&:hover": {
              cursor: "default",
              "& .MuiPaper-rounded": {
                borderRadius: "0",
              },
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                onClick={() => showMessage(message.id)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    background: "rgba(0,0,0,0.1)",
                    borderRadius: "50%",
                  },
                }}
              />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              "&:hover:not(.Mui-disabled)": {
                cursor: "default",
              },
            }}
          >
            <Typography
              className={message.type.toLowerCase() + "_color"}
              sx={{
                "&:hover": {
                  cursor: "default",
                },
                alignSelf: "center",
                width: "5%",
                flexShrink: 0,
                fontWeight: arraySeenMessage.includes(message.id) || message.seen ? 400 : 700,
              }}
            >
              {message.code}
            </Typography>
            <Typography
              sx={{
                "&:hover": {
                  cursor: "default",
                },
                alignSelf: "center",
                color: arraySeenMessage.includes(message.id) || message.seen ? "#00000075" : "#000",
                width: "33%",
                flexShrink: 0,
                fontWeight: arraySeenMessage.includes(message.id) || message.seen ? 400 : 700,
              }}
            >
              {message.title}
            </Typography>
            <Typography
              sx={{
                "&:hover": {
                  cursor: "default",
                },
                alignSelf: "center",
                color: arraySeenMessage.includes(message.id) || message.seen ? "#00000075" : "#000",
                width: "33%",
                flexShrink: 0,
                marginLeft: "auto",
                textAlign: "end",
                paddingRight: 4,
                fontWeight: arraySeenMessage.includes(message.id) || message.seen ? 400 : 700,
              }}
            >
              {format(new Date(message.date), "HH:mm")}
            </Typography>
            {/* <MarkunreadIcon
              color="info"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                alignSelf: "center",
                marginRight: 2,
              }}
            /> */}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{message.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
