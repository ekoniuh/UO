export const getNavigationLinks = (id, role) => [
  {
    pathName: `/${role}/installation/${id}`,
    title: "Текущие значения",
    subLinks: [],
  },
  {
    pathName: "/NotFoundPage",
    title: "Журнал",
    subLinks: [
      {
        pathName: `/${role}/installation/${id}/middle-states`,
        title: "Журнал параметров",
      },
      {
        pathName: `/${role}/installation/${id}/messages`,
        title: "Журнал сообщений",
      },
      {
        pathName: `/${role}/installation/${id}/events`,
        title: "Журнал событий",
      },
      {
        pathName: `/${role}/installation/${id}/start-states`,
        title: "Журнал стартовых параметров",
      },
    ],
  },
  {
    pathName: "/NotFoundPage",
    title: "Экономика",
    subLinks: [
      {
        pathName: `/${role}/installation/${id}/economic-analysis`,
        title: "Экономический анализ",
      },
      {
        pathName: `/${role}/installation/${id}/costs`,
        title: "Расходы",
      },
    ],
  },
  {
    pathName: "/NotFoundPage",
    title: "Настройки",
    subLinks: [
      {
        pathName: `/${role}/installation/${id}/normalization`,
        title: "Нормализация",
      },
      {
        pathName: `/${role}/installation/${id}/regulations`,
        title: "Регламент",
      },
      {
        pathName: `/${role}/installation/${id}/setting-installation`,
        title: "Настройки журналов",
      },
      {
        pathName: `/${role}/installation/${id}/setting-algorithms`,
        title: "Настройки алгоритмов",
      },
    ],
  },
  {
    pathName: `/${role}/archive/${id}`,
    title: "Архив",
    subLinks: [],
  },
  {
    pathName: `/NotFoundPage`,
    title: "Установка",
    subLinks: [
      {
        pathName: `/${role}/installation/${id}/description`,
        title: "Описание установки",
      },
      {
        pathName: `/${role}/installation/${id}/documents`,
        title: "Документы",
      },
      {
        pathName: `/NotFoundPage`,
        title: "Сервис",
      },
      {
        pathName: `/${role}/main`,
        title: "Главные установки",
      },
    ],
  },
  {
    pathName: `/${role}/installation/${id}/messages`,
    // title: "Количество неквитированых сообщений:",
    children: "CountMessage",
    subLinks: [],
  },
];
