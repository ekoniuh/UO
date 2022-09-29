import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import NotFoundPage from "./NotFoundPage";
import { Context } from "../../../index";
import Button from "@mui/material/Button";

const NotFoundPage = () => {
  const { store } = useContext(Context);
  const role = store.user?.role.toLowerCase();
  const pathname = role ? `/${role}/installation/1/` : `/login`;

  return (
    <div style={{ width: 400, margin: "auto", textAlign: "center" }}>
      <h1 style={{ color: "rgb(78, 79, 81)rgb(78, 79, 81)", fontSize: 100 }}>404</h1>
      <h3>Страница не найдена</h3>
      <p>
        <Button
          component={Link}
          to={pathname}
          size="large"
          variant="contained"
          color="primary"
          // component={<Link to={pathname} style={{ color: "#fff", fontSize: "20px", fontWeight: 900 }} />}
        >
          Перейти на домашнюю страницу
        </Button>
        {/* <Link to={pathname} style={{ color: "#fff", fontSize: "20px", fontWeight: 900 }}>
        Перейти на домашнюю страницу
        </Link> */}
      </p>
    </div>
  );
};

export { NotFoundPage };
