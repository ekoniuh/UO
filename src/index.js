import { SnackbarProvider } from "notistack";
import { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./common.css";
import Store from "./Components/common/LoginPage/store/store";
// import * as serviceWorker from './serviceWorker';
import { httpService } from "./services/HttpService";

httpService.init("http://217.21.59.101:30000");

export const store = new Store();
export const Context = createContext({ store });

const root = document.getElementById("root");

ReactDOM.render(
  <Context.Provider value={{ store }}>
    <SnackbarProvider maxSnack={6}>
      <App />
    </SnackbarProvider>
  </Context.Provider>,
  root
);
