import React from "react";
import { NavLink } from "react-router-dom";
import { CountMessage } from "./CountMessage";

export const NavigationItem = ({ title, pathName, subLinks, children, unreadMessagesCount }) => {
  return (
    <li key={title}>
      <NavLink
        key={title}
        // isActive={(match) => {
        //   console.log("match", match);
        // }}
        // activeClassName="navigation__link--active"
        to={pathName}
      >
        {title}
        {children && <CountMessage unreadMessagesCount={unreadMessagesCount} />}
      </NavLink>
      {subLinks.length !== 0 && (
        <ul>
          {subLinks.map(({ pathName, title }) => {
            return (
              <li key={title}>
                <NavLink key={title} to={pathName}>
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};
