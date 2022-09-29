// export const CONFIG_JOURNAL_EVENTS = {
//   "membrane-washed": {
//     pathName: "MembranWashed",
//     date: "",
//     lastDateURL: "LastMembranWashEvent",
//     addEventURL: "AddMembranWash",
//     updateDateEventURL: "UpdateEvent",
//     nameEventAllDate: "LastMembranWashEvent",
//   },
//   "membrane-changed": {
//     pathName: "MembranChanged",
//     date: "",
//     lastDateURL: "GetLastMembranChangedEvent",
//     addEventURL: "AddMembranChangedEvent",
//     updateDateEventURL: "UpdateEvent",
//     nameEventAllDate: "GetMembranChangedEvents",
//   },
//   "filter-changed": {
//     pathName: "FilterChanged",
//     date: "",
//     lastDateURL: "GetLastFilterChanged",
//     addEventURL: "AddFilterChangedEvent",
//     updateDateEventURL: "UpdateEvent",
//     deleteEventURL: "DeleteEvent",
//     nameEventAllDate: "GetFilterChangedEvents",
//   },
//   "work-type-changed": {
//     pathName: "WorkTypeChanged",
//     date: "",
//     lastDateURL: "GetLastWorkTypeChangedEvent",
//     addEventURL: "AddWorkTypeChanged",
//     updateDateEventURL: "UpdateEvent",
//     nameEventAllDate: "GetWorkTypeChangedEvents",
//   },
//   "remote-view": {
//     pathName: "RemoteView",
//     date: "",
//     lastDateURL: "GetLastRemoteViewEvent",
//     updateDateEventURL: "UpdateEvent",
//     deleteEventURL: "DeleteEvent",
//     addEventURL: "AddRemoteViewEvent",
//     nameEventAllDate: "GetRemoteViewEvents",
//   },
// };

export const CONFIG_JOURNAL_EVENTS = [
  { date: "-", name: "MembranWashed", pathname: "membrane-washed", title: "Промывка" },
  {
    date: "-",
    name: "MembranChanged",
    pathname: "membrane-changed",
    title: "Старт установки / Замена мембран",
  },
  {
    date: "-",
    name: "FilterChanged",
    pathname: "filter-changed",
    title: "Замена фильтрующих элементов",
  },
  {
    date: "-",
    name: "WorkTypeChanged",
    pathname: "work-type-changed",
    title: "Изменение режима работы",
  },
  {
    date: "-",
    name: "RemoteView",
    pathname: "remote-view",
    title: "Удаленный осмотр / Сервисный выезд",
  },
];
