import React, { useState, useContext } from "react";
// import { FormErrors } from "./FormErrors";
import "./Form.css";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
// import { toJS } from "mobx";
import { Navigate } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

function LoginPage() {
  const { store } = useContext(Context);
  const [options, setOptions] = useState({
    email: "",
    password: "",
    formErrors: { email: "", password: "" },
    emailValid: false,
    passwordValid: false,
    formValid: false,
  });

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setOptions((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // validateField(name, value);
  };

  // const validateField = (fieldName, value) => {
  //   let fieldValidationErrors = options.formErrors;
  //   let emailValid = options.emailValid;
  //   let passwordValid = options.passwordValid;

  //   switch (fieldName) {
  //     case "email":
  //       emailValid = value.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i);
  //       fieldValidationErrors.email = emailValid ? "" : "Введён не валидный логин";

  //       break;
  //     case "password":
  //       passwordValid = value.length >= 6;
  //       fieldValidationErrors.password = passwordValid ? "" : "Введите не менее 6 символов";
  //       break;
  //     default:
  //       break;
  //   }
  //   setOptions((prevState) => {
  //     return {
  //       ...prevState,
  //       formErrors: fieldValidationErrors,
  //       emailValid: emailValid,
  //       passwordValid: passwordValid,
  //       // formValid: options.emailValid && options.passwordValid,
  //     };
  //   });
  // };

  // const validateForm = () => {
  //   return options.emailValid && options.passwordValid;
  // };

  const errorClass = (error) => {
    return error.length === 0 ? "" : "has-error";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = { loginOrEmail: options.email, pass: options.password };

    store.login(userInfo);
  };

  if (store.isAuth) {
    const pathName =
    store.user?.role === "Administrator"
        ? `/${store.user?.role.toLowerCase()}/main`
        : `/${store.user?.role.toLowerCase()}/installation/1/`;
    return <Navigate to={pathName} replace />;
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-container">
        <h2>ВОЙТИ</h2>
        <div
          style={{
            width: 60,
            height: 60,
            margin: "auto",
            borderRadius: 12,
            background: "#593f3f",
          }}
        >
          <span style={{ lineHeight: "50px", color: "#fff", fontSize: 60 }}>A</span>
        </div>
        <div className={`form-group form-container__email ${errorClass(options.formErrors.email)}`}>
          <label htmlFor="email">логин</label>
          <input
            style={{ textAlign: "left" }}
            className="email-control"
            name="email"
            id="email"
            placeholder="Email"
            value={options.email}
            onChange={handleUserInput}
          />
          <div className="panel panel-default" style={{ color: "red" }}>
            {store.error}
            {/* {!options.emailValid && (
           <FormErrors message={options.formErrors.email} />
         )} */}
          </div>
        </div>
        <div
          className={`form-group form-container__password ${errorClass(
            options.formErrors.password
          )}`}
        >
          <label htmlFor="password">пароль</label>
          <input
            style={{ textAlign: "left" }}
            type="password"
            className="password-control"
            name="password"
            id="password"
            placeholder="********"
            value={options.password}
            onChange={handleUserInput}
          />
          <div className="panel panel-default">
            {/* {!options.passwordValid && (
           <FormErrors message={options.formErrors.password} />
         )} */}
          </div>
        </div>
        {/* <input
          type="submit"
          className={options.emailValid && options.passwordValid ? "btn-active" : ""}
          // disabled={!(options.emailValid && options.passwordValid)}
          value="Войти"
        /> */}
        <Button type="submit" size="large" variant="contained" color="primary" sx={{ width: 200 }}>
          <LoginIcon />
          Войти
        </Button>
      </div>
    </form>
  );
}

export default observer(LoginPage);
