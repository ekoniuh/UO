import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
// import { API_URL } from "../http/";
// import axios from "axios";
import { getUserInfoFromToken } from "../../../../utils/checkUser";
// import React from "react";
// import { useLocation, useHistory, useNavigate } from "react-router-dom";

export default class Store {
  user = localStorage.getItem("role") || null;
  isAuth = false;
  isLoading = false;
  error = "";
  constructor() {
    makeAutoObservable(this, {
      // value: observable,
      // setAuth: action,
    });
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setError(message) {
    this.error = message;
  }

  setUser(user) {
    this.user = { ...user };
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);

      // console.log("response", response.data.token);
      localStorage.setItem("token", response.data.token);
      const userInfo = getUserInfoFromToken(response.data.token);
      this.setUser(userInfo);
      this.setAuth(true);
      this.setError("");
    } catch (e) {
      // console.log(e.response?.data?.message);
      // console.log("e.message", e.message);
      this.setError(e.message);
      // console.log("error", this.error);

      // this.setAuth(false);
    }
  }

  async registration(email, password) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      const userInfo = getUserInfoFromToken(response);
      localStorage.setItem("userInfo", userInfo);
      this.setUser(userInfo);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async logout() {
    try {
      // const response = await AuthService.logout();
      // localStorage.removeItem("token");
      localStorage.clear();
      this.setAuth(false);
      this.setUser({});
      // window.location.replace("/login");
      window.history.push("/login");
    } catch (e) {
      // console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    if (!localStorage.getItem("token")) {
      return;
    }
    try {
      // return $api.post("/users/login", user);

      // const response = await fetch(`${API_URL}installation/1/formuls`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });

      // console.log('response')

      // $api.interceptors.request.use((config) => {
      //   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      //   return config;
      // });
      // const response = await axios.get(`${API_URL}/users/login`, { withCredentials: true });

      // localStorage.setItem("token", response.data.token);
      // localStorage.getItem("token");

      const userInfo = getUserInfoFromToken(localStorage.getItem("token"));
      this.setUser(userInfo);
      this.setAuth(true);
    } catch (e) {
      console.log(e.response?.data?.message);
      console.log(e.message);
    } finally {
      this.setLoading(false);
    }
  }
}
