/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./styleNavigation.css";
// import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useData } from "../../../requests/getDataInstallation";
import { NavigationItem } from "./components";
import { getNavigationLinks } from "./config";
/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { API_CONFIG } from "../../../constants";
import { Context } from "../../../index";
import { httpService } from "../../../services";
import { LogInButton } from "./components/LogInButton";

 const Navigation = observer(() => {
  const { installationId } = useParams();
  const { store } = useContext(Context);
  const navigationLinks = getNavigationLinks(installationId);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState();
  const [nameInstallation, setNameInstallation] = useState();

  useEffect(() => {
    // (async () => {
    const responseCountMessage = httpService.sendRequest(
      API_CONFIG.getUnreadMessagesCount(installationId).PATH
    );
    const responseName = httpService.sendRequest(`/installation/${installationId}/`);
    setUnreadMessagesCount(responseCountMessage?.data);
    setNameInstallation(responseName?.data);
    // })();
  }, [installationId]);

  return (
    <header className="header">
      <nav className="navigation">
        <ul className="navigation-list">
          {navigationLinks.map((item) => (
            <NavigationItem key={item.title} unreadMessagesCount={unreadMessagesCount} {...item} />
          ))}
        </ul>
      </nav>
      <LogInButton
        installationId={installationId}
        isAuth={store.isAuth}
        onLogout={() => store.logout()}
        role={store.user?.role}
      />
      {/* <button
        type="button"
        style={{
          color: "blue",
          fontSize: 22,
          width: 100,
          height: 40,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        <NavLink to={`/installation/${installationId}/form`} onClick={() => store.logout()}>
          {store.isAuth ? "Выйти" : "Войти"}
        </NavLink>
      </button> */}

      <h2>{nameInstallation || "..."}</h2>
    </header>
  );
});
