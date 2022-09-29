export const ROUTES = {
  ROOT: "/",
  LOGIN_PAGE: "/login",
  REDIRECT_PAGE: "/redirect",
  ADMIN: {
    MANAGERS_PAGE: "/managers",
  },
  MANAGER: {},
  OPERATOR: {},
};

export const configRoutes = () => [
  {
    path: "/",
    exact: true,
    // component: Home,
    loading: "Custom loading for home page...",
    error: "Custom error for home page",
    meta: {
      // [AUTH_ONLY]: true,
    },
  },
  {
    path: "/hello/:id",
    exact: true,
    // component: Hello,
    meta: {
      // [AUTH_ONLY]: true,
    },
  },
  {
    path: "/goodbye",
    exact: true,
    // component: GoodBye,
  },
  {
    path: "/login",
    exact: true,
    // component: Login,
  },
  {
    path: "*",
    // component: NotFound,
    ignoreGlobal: true,
  },
];
