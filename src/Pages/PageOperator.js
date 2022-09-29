/* eslint-disable react-hooks/exhaustive-deps */
import "../Components/operator/Navigation/styleNavigation.css";
import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getNavigationLinks } from "../Components/operator/Navigation/config";
import { NavigationItem } from "../Components/operator/Navigation/components/NavigationItem";
import { Context } from "../index";
import { LogInButton } from "../Components/operator/Navigation/components/LogInButton";
import { observer } from "mobx-react-lite";
import { httpService } from "../services/HttpService";
import { API_CONFIG } from "../constants";
import { Loader } from "../helpers";

export const PageOperator = observer(({ children }) => {
  const { installationId } = useParams();
  const { store } = useContext(Context);
  const role = store.user.role.toLowerCase();

  const navigationLinks = getNavigationLinks(installationId, role);
  const [isLoading, setIsLoading] = useState(true);
  const [nameInst, setNameInst] = useState();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(async () => {
    setIsLoading(true);
    const { data } = await httpService.sendRequest(API_CONFIG.getNameInst(installationId).PATH);
    const { data: unreadMessages } = await httpService.sendRequest(
      API_CONFIG.getUnreadMessagesCount(installationId).PATH
    );

    setNameInst(data?.name);
    setUnreadMessagesCount(unreadMessages);
    setIsLoading(false);
  }, [installationId]);

  return (
    <>
      <header className="header">
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
        <LogInButton
          installationId={installationId}
          isAuth={store.isAuth}
          onLogout={() => store.logout()}
        />
        <div>
          <h2 style={{ color: "#fff", margin: 10, textAlign: "center" }}>
            {isLoading ? (
              <Loader isLoading={isLoading} size="3vh" lineHeight={0} />
            ) : (
              nameInst || "Имени нет"
            )}
          </h2>
          <div style={{ width: 160, textAlign: "center" }}>
            <span style={{ color: "#c25e5e", fontSize: 16 }}>Роль - {store.user.role}</span>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
});
