import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";

import { Button } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Chip, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

export function RowTable({ dataInst, dataCompany, openModal }) {
  const [openRowTable, setOpenRowTable] = useState(false);
  const navigate = useNavigate();

  const goToPageInstallation = (id) => {
    navigate(`/administrator/archive/${id}`);
  };

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:hover": { background: "#dadada59" },
        }}
        key={dataCompany.id}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="large"
            onClick={() => setOpenRowTable(!openRowTable)}
          >
            {openRowTable ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dataCompany.name}
        </TableCell>
        {/* <TableCell align="center">
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Brightness1Icon color="success" sx={{ mr: 2 }} />
            Статус
          </Box>
        </TableCell> */}

        <TableCell align="center">
          <Button
            variant="contained"
            size="small"
            startIcon={<AddCircleIcon />}
            onClick={() => openModal({ name: "addInst", idCompany: dataCompany.id })}
          >
            Добавить установку
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRowTable} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Название установки</TableCell>
                    {/* <TableCell>Статус</TableCell>
                    <TableCell align="center">Дата установки</TableCell> */}
                    <TableCell align="center" sx={{ maxWidth: "64%", width: "100%" }}>
                      Пользователи
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataInst.map((inst, index) => (
                    <TableRow key={inst.id}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <DeleteForeverIcon sx={{ mr: 2, color: "red" }} />
                          <DriveFileRenameOutlineIcon sx={{ mr: 2, color: "blue" }} />
                          <Typography
                            // variant="h6"
                            component="span"
                            sx={{ cursor: "pointer", "&:hover": { background: "#dadada59" }, p: 1 }}
                            onClick={() => goToPageInstallation(inst.id)}
                          >
                            {inst.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      {/* <TableCell
                        sx={{
                          pl: 0,
                        }}
                      >
                        <Box
                          sx={{
                            pl: 0,
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                          }}
                        >
                          <Brightness1Icon
                            color="success"
                            fontSize="small"
                            sx={{
                              mr: 2,
                            }}
                          />
                          {inst?.status ?? ""}
                        </Box>
                      </TableCell> */}
                      {/* <TableCell align="center">
                        {format(new Date(inst.ecoStartDate), "yyyy-MM-dd HH:mm")}
                      </TableCell> */}
                      <TableCell align="center">
                        <Stack direction="row" spacing={2}>
                          <Stack
                            direction="row"
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                              flexWrap: "wrap",
                              gap: "7px",
                              width: "100%",
                            }}
                          >
                            {inst?.users.map(
                              (user) =>
                                user?.email && (
                                  <Chip
                                    key={user?.email}
                                    label={user?.email}
                                    variant="outlined"
                                    onDelete={() =>
                                      openModal({ name: "deleteUser", emailUser: user?.email })
                                    }
                                    // onClick={}
                                  />
                                )
                            )}
                          </Stack>

                          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <Tooltip title="Добавить пользователя" placement="right">
                              <IconButton
                                aria-label="delete"
                                size="large"
                                onClick={() =>
                                  openModal({
                                    name: "addUser",
                                    idCompany: dataCompany.id,
                                    installationId: inst.id,
                                  })
                                }
                              >
                                <AddCircleIcon fontSize="large" color="info" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
