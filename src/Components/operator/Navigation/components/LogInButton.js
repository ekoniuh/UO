import React from "react";
import { NavLink } from "react-router-dom";

export const LogInButton = ({ installationId, isAuth, onLogout, role }) => {
  const title = isAuth ? "Выйти" : "Войти";

  return (
    <button
      type="button"
      style={{
        color: "#fff",
        margin: 10,
        fontSize: 22,
        width: 100,
        height: 40,
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      <NavLink to={`/login`} onClick={onLogout}>
        {title}
      </NavLink>
    </button>
  );
};
