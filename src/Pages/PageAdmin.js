/* eslint-disable react-hooks/exhaustive-deps */
import { AppBar } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavigationItem } from "../Components/admin/Navigation/components/";
import { getNavigationLinks } from "../Components/admin/Navigation/config";
import "../Components/admin/Navigation/styleNavigation.css";
import { API_CONFIG } from "../constants";
import { Context } from "../index";
import { httpService } from "../services/HttpService";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
// import InvertColorsIcon from '@mui/icons-material/OilBarrel';
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import Logout from "@mui/icons-material/Logout";
// import InvertColorsIcon from '@mui/icons-material/OilBarrel';
// import PersonAdd from "@mui/icons-material/PersonAdd";
// import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

export const PageAdmin = observer(({ children, isMainPage = false }) => {
  const { installationId } = useParams();
  const { store } = useContext(Context);
  const role = store.user.role.toLowerCase();
  const navigate = useNavigate();

  const navigationLinks = getNavigationLinks(installationId, role);
  // const [isLoading, setIsLoading] = useState(true);
  const [nameInst, setNameInst] = useState();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openMainPage = () => {
    handleClose();
    const pathName = "/administrator/main";
    // return <Navigate to={pathName} replace />;
    navigate(pathName);
  };

  const handleLogout = () => {
    handleClose();
    store.logout();
  };

  useEffect(async () => {
    if (typeof installationId === "undefined") {
      return;
    }
    // setIsLoading(true);
    const { data } = await httpService.sendRequest(API_CONFIG.getNameInst(installationId).PATH);
    const { data: unreadMessages } = await httpService.sendRequest(
      API_CONFIG.getUnreadMessagesCount(installationId).PATH
    );

    setNameInst(data?.name);
    setUnreadMessagesCount(unreadMessages?.unreadMessagesCount);
    // setIsLoading(false);
  }, [installationId]);

  return (
    <>
      <AppBar
        position="static"
        style={{
          // minHeight: "50px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#3a3a3a",
          boxShadow: "0px 0px 4px 0px rgb(255 255 255 / 81%)",
        }}
      >
        <Box
          sx={{
            maxWidth: "90%",
            display: "flex",
            justifyContent: !isMainPage ? "space-between" : "end",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {!isMainPage && (
            <nav className="navigation">
              <ul className="navigation-list">
                {navigationLinks.map((item) => (
                  <NavigationItem
                    key={item.title}
                    unreadMessagesCount={unreadMessagesCount}
                    {...item}
                  />
                ))}
              </ul>
            </nav>
          )}
          <Tooltip title="Администратор" sx={{ width: 32, ml: "auto" }}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ p: 0 }}
              style={{ marginBottom: 4, marginTop: 4 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>А</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "& .MuiList-root": {
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <MenuItem>
          <ListItemIcon>
          <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
          </MenuItem>
          <MenuItem>
          <ListItemIcon>
          <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem> */}
          {!isMainPage && (
            <Box sx={{ margin: "0 auto" }}>
              <MenuItem sx={{ cursor: "auto", margin: "0 auto" }}>
                <ListItemIcon>
                  <InvertColorsIcon fontSize="small" onClick={null} />
                </ListItemIcon>
                {nameInst}
              </MenuItem>
              <Divider />
            </Box>
          )}

          <MenuItem onClick={openMainPage} style={{ padding: "6px 16px" }}>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            Главная
          </MenuItem>
          <MenuItem onClick={handleLogout} style={{ padding: "6px 16px" }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Выйти
          </MenuItem>
        </Menu>
        {/* <LogInButton
            installationId={installationId}
            isAuth={store.isAuth}
            onLogout={() => store.() => store.logout()out()}
          /> */}

        {/* 
          <div>
            <h2 style={{ color: "#fff", margin: 10, textAlign: "center" }}>
              {isLoading ? (
                <Loader isLoading={isLoading} size="3vh" lineHeight={0} />
              ) : (
                nameInst || "Имени нет"
              )}
            </h2>
            <div style={{ width: 160, textAlign: "center" }}>
              <span style={{ color: "#c25e5e", fontSize: 16 }}>Роль - {store?.user.role}</span>
            </div>
          </div> */}
      </AppBar>

      <main>{children}</main>
    </>
  );
});
