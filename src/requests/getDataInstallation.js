/* eslint-disable array-callback-return */
/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react";
import { store } from "../";
import { format } from "date-fns";
import { CONFIG_JOURNAL_EVENTS } from "../constants/configJournalEvents";

const API_SERVER_ADDRESS = "http://217.21.59.101:30000/installation";

function changeFormatDate(data) {
  return data
    .map((item) => {
      item.date = new Date(item.date).toLocaleString();
      item.type = item.type.toLowerCase();
      return item;
    })
    .reverse();
}

function changeFormatDateForPageChart(data, middlestates) {
  return data.reverse().map((row) => {
    Object.keys(row).map((cell, index) => {
      if (row[cell] === 0 || cell === "deltaP1") {
        row[cell] = "-";
      }
      if (cell === "date") {
        row[cell] =
          middlestates === "middlestates"
            ? format(new Date(row[cell]), "dd-MM-yyyy")
            : format(new Date(row[cell]), "HH:mm");
      }
    });
    return row;
  });
}

async function getDataInstallation(url) {
  try {
    let response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.status === 401 || response.status === 403) {
      store.logout();
    }
    let dataInstallation = null;
    // let dataInstallation = [];
    try {
      dataInstallation = await response.json();
    } catch (error) {
      console.log("error :>> ", error);
    }
    // console.log('url :>> ', url);
    // console.log('response.status :>> ', response.status);
    // console.log('response.json() :>> ', response.json());
    // console.log('dataInstallation :>> ', dataInstallation);
    if (response.status !== 200) {
      return { status: "error" };
    } else if (!dataInstallation || !Object.keys(dataInstallation).length) {
      return { status: "empty" };
    } else {
      return { data: dataInstallation, status: "success" };
    }
  } catch (error) {
    console.log("error :>> ", error);
    return { status: "error" };
  }
}

async function setStatusMessage(idMessage) {
  try {
    await fetch(`http://217.21.59.101:30000/message/seen/${idMessage}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
}

class DataModel {
  constructor() {
    this.listeners = {
      update: [],
    };
    this.data = {};
  }

  addListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [listener];
    } else {
      this.listeners[eventName].push(listener);
    }

    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter((existedListener) => {
        return existedListener !== listener;
      });
    };
  }

  triggerEvent(eventName, data) {
    this.listeners[eventName]?.forEach((listener) => listener(data));
  }

  /* dataPatch should be object only */
  setData(dataPatch) {
    this.data = { ...this.data, ...dataPatch };
    this.triggerEvent("update", this.data);
  }

  getData() {
    return this.data;
  }
}

const dataModel = new DataModel();

export function useData() {
  const [responseStatus, setResponseStatus] = useState(null);
  const [dataStateStatus, setDataStateStatus] = useState();
  const [allDateEvent, setAllDateEvent] = useState();
  const [dataEvents, setDataEvents] = useState();
  const [dataState, setDataState] = useState();
  const [dataRinsingState, setDataRinsingState] = useState();
  const [dataWorkingState, setDataWorkingState] = useState();
  const [dataMembranWash, setDataMembranWash] = useState();
  const [dataStartState, setDataStartState] = useState();
  const [dataZeroState, setDataZeroState] = useState();
  const [dataCurrentStateInst, setDataCurrentStateInst] = useState();
  const [messages, setMessages] = useState([]);
  const [nameInstallation, setNameInstallation] = useState("");
  const [unreadMessagesCount, setUnreadMessagesCount] = useState();
  const [dataWash, setDataWash] = useState();
  const [dataRisingParams, setDataRisingParams] = useState();
  const [dataChartCosts, setDataChartCosts] = useState();
  const [dataOnDayCosts, setDataOnDayCosts] = useState();
  const [dataTotalModelExpenses, setDataTotalModelExpenses] = useState();
  const [dataTotalCosts, setDataTotalCosts] = useState();
  const [currentMonitoringCycle, setCurrentMonitoringCycle] = useState();
  const [dataPump, setDataPump] = useState();
  const [dataAntiscalant, setDataAntiscalant] = useState();
  const [dataEconomicAnalysis, setDataEconomicAnalysis] = useState({
    permiat: {},
    wash: {},
    electricity: {},
    antiscalant: {},
    membrane: {},
    drain: {},
    chemicalWash: {},
  });
  const [dataRegulationsModel, setdataRegulationsModel] = useState();

  const [dateEconomicCosts, setDateEconomicCosts] = useState([]);
  const [dataChartEconomicAnalysis, setDataChartEconomicAnalysis] = useState();

  useEffect(() => {
    const unsubscribe = dataModel.addListener("update", (data) => {
      setUnreadMessagesCount(data.unreadMessagesCount);
      setNameInstallation(data.nameInstallation);
      setDataState(data.dataState);
      setDataWorkingState(data.dataWorkingState);
      setDataRinsingState(data.dataRinsingState);
      setDataStartState(data.dataStartState);
      setDataZeroState(data.dataZeroState);
      setDataStateStatus(data.dataStateStatus);
      setAllDateEvent(data.allDateEvent);
      setDataWash(data.dataWash);
      setDataMembranWash(data.dataMembranWash);
      setDataRisingParams(data.dataRisingParams);
      setDataChartCosts(data.dataChartCosts);
      setDataTotalCosts(data.dataTotalCosts);
      setDataOnDayCosts(data.dataOnDayCosts);
      setDataTotalModelExpenses(data.dataTotalModelExpenses);
      setDataEvents({ ...data.dataEvents });
      setCurrentMonitoringCycle(data.currentMonitoringCycle);
      setDataPump(data.dataPump);
      setDataAntiscalant(data.dataAntiscalant);
      setDataEconomicAnalysis(data.dataEconomicAnalysis);
      setDateEconomicCosts({ ...data.dateEconomicCosts });
      setDataChartEconomicAnalysis(data.dataChartEconomicAnalysis);
      setdataRegulationsModel(data.dataRegulationsModel);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function loadDataStateInst(id, date) {
    let url = "";
    if (date === "middlestates") {
      url = `${API_SERVER_ADDRESS}/${id}/AllMiddleStates/`;
    } else {
      url = `${API_SERVER_ADDRESS}/${id}/daystates/${date}`;
    }

    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataState: changeFormatDateForPageChart(optionsRequest.data, date),
      });
      setResponseStatus({
        status: "success",
        message: `Данные ${date === "middlestates" ? "средних значений" : "за: " + date} загружены`,
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataState: [],
      });
      setResponseStatus({
        status: "error",
        message: `Данные ${
          date === "middlestates" ? "средних значений" : "за: " + date
        } отсутствуют`,
      });
    } else if (optionsRequest.status === "error") {
      dataModel.setData({
        dataState: [],
      });
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadDataNormalization(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/AllNormMiddleStates`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataState: changeFormatDateForPageChart(optionsRequest.data, "middlestates"),
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataState: [],
      });
      setResponseStatus({
        status: "error",
        message: "Данных не получено",
      });
    } else if (optionsRequest.status === "error") {
      dataModel.setData({
        dataState: [],
      });
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadDataSettingInstallation(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/GetSettings`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataState: optionsRequest.data,
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataState: [],
      });
      setResponseStatus({
        status: "error",
        message: "Данных не получено",
      });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }
  async function loadDataRisingParams(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/GetRisingParams`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataRisingParams: optionsRequest.data,
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataRisingParams: [],
      });
      setResponseStatus({
        status: "error",
        message: "Данных не получено",
      });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }
  async function loadDataRegulationsModel(id, pathname) {
    const url = `${API_SERVER_ADDRESS}/${id}/${pathname}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataRegulationsModel: optionsRequest.data,
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataRegulationsModel: [],
      });
      // setResponseStatus({
      //   status: "error",
      //   message: "Данных не получено",
      // });
    } else if (optionsRequest.status === "error") {
      dataModel.setData({
        dataRegulationsModel: [],
      });
      // setResponseStatus({
      //   status: "error",
      //   message: "Произошла ошибка: сервер не отвечает",
      // });
    }
  }

  async function loadDataForFormulasInst(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/formuls`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataState: optionsRequest.data,
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataState: [],
      });
      // setResponseStatus({
      //   status: "error",
      //   message: "Данных не получено",
      // });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadDataNormalizationAuto(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/single`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataState: optionsRequest.data,
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataState: [],
      });
      setResponseStatus({
        status: "error",
        message: "Данных не получено",
      });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadDataStartStates(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/AllStartStates`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataStartState: optionsRequest.data.sort((a, b) =>
          Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
        ),
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataStartState: [],
      });
      // setResponseStatus({
      //   status: "error",
      //   message: "Данных не получено",
      // });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadDataZeroStates(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/GetAllZeroStates`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataZeroState: optionsRequest.data.sort((a, b) =>
          Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
        ),
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataZeroState: [],
      });
      // setResponseStatus({
      //   status: "error",
      //   message: "Данных не получено",
      // });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadDateEconomicCosts(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/GetAnalizePeriod`;
    const optionsRequest = await getDataInstallation(url);
    const period = await optionsRequest.data;
    // optionsRequest.status = "empty";
    if (optionsRequest.status === "success") {
      dataModel.setData({
        dateEconomicCosts: optionsRequest.data,
      });
      // loadDataEconomicAnalysis(id, optionsRequest.data);
      // loadDataChartEconomicAnalysis(id, optionsRequest.data);
      return period;
    } else if (optionsRequest.status === "empty") {
      const emptyPeriod = {
        // disableInputDate: true,
        startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
        endDate: new Date().toISOString(),
      };

      // dataModel.setData({
      //   dateEconomicCosts: emptyPeriod,
      // });
      // dataModel.setData({
      //   dataEconomicAnalysis: {
      //     permiat: {},
      //     wash: {},
      //     electricity: {},
      //     antiscalant: {},
      //     membrane: {},
      //     drain: {},
      //     chemicalWash: {},
      //   },
      // });
      // dataModel.setData({
      //   dataChartEconomicAnalysis: {},
      // });
      // setResponseStatus({
      //   status: "error",
      //   message: "Данных не получено",
      // });
      return emptyPeriod;
    } else if (optionsRequest.status === "error") {
      const emptyPeriod = {
        // disableInputDate: true,
        startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
        endDate: new Date().toISOString(),
      };
      // dataModel.setData({
      //   dateEconomicCosts: emptyPeriod,
      // });
      // dataModel.setData({
      //   dataEconomicAnalysis: {
      //     permiat: {},
      //     wash: {},
      //     electricity: {},
      //     antiscalant: {},
      //     membrane: {},
      //     drain: {},
      //     chemicalWash: {},
      //   },
      // });
      // dataModel.setData({
      //   dataChartEconomicAnalysis: {},
      // });
      // setResponseStatus({
      //   status: "error",
      //   message: "Произошла ошибка: сервер не отвечает",
      // });
      return emptyPeriod;
    }
  }

  async function loadDataEconomicAnalysis(pathname) {
    const url = `${API_SERVER_ADDRESS}/${pathname}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataEconomicAnalysis: optionsRequest.data,
      });
      // dataModel.setData({
      //   dateEconomicCosts: {
      //     ...dateEconomicCosts,
      //     disableInputDate: false,
      //   },
      // });
      return optionsRequest.data;
    } else if (optionsRequest.status === "empty") {
      // dataModel.setData({
      //   dateEconomicCosts: {
      //     disableInputDate: false,
      //   },
      // });
      // dataModel.setData({
      //   dataEconomicAnalysis: {
      //     permiat: {},
      //     wash: {},
      //     electricity: {},
      //     antiscalant: {},
      //     membrane: {},
      //     drain: {},
      //     chemicalWash: {},
      //   },
      // });

      // setResponseStatus({
      //   status: "error",
      //   message: "Данных не получено",
      // });
      return {
        permiat: {},
        wash: {},
        electricity: {},
        antiscalant: {},
        membrane: {},
        drain: {},
        chemicalWash: {},
      };
    } else if (optionsRequest.status === "error") {
      // dataModel.setData({
      //   dateEconomicCosts: {
      //     disableInputDate: false,
      //   },
      // });
      // dataModel.setData({
      //   dataEconomicAnalysis: {
      //     permiat: {},
      //     wash: {},
      //     electricity: {},
      //     antiscalant: {},
      //     membrane: {},
      //     drain: {},
      //     chemicalWash: {},
      //   },
      // });
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
      return {
        permiat: {},
        wash: {},
        electricity: {},
        antiscalant: {},
        membrane: {},
        drain: {},
        chemicalWash: {},
      };
    }
  }

  async function loadDataChartEconomicAnalysis(pathname) {
    const url = `${API_SERVER_ADDRESS}/${pathname}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataChartEconomicAnalysis: optionsRequest.data,
      });
      // setResponseStatus({
      //   status: "error",
      //   message: "Данных не получено",
      // });
      return optionsRequest.data;
      // loadDataEconomicAnalysis(id, { endDate, startDate });
    } else if (optionsRequest.status === "empty") {
      // dataModel.setData({
      //   dataChartEconomicAnalysis: {},
      // });
      // setResponseStatus({
      //   status: "error",
      //   message: "Данных не получено",
      // });
      return {};
    } else if (optionsRequest.status === "error") {
      // dataModel.setData({
      //   dataChartEconomicAnalysis: {},
      // });
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
      return {};
    }
  }

  async function loadMessages(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/messages`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      setMessages(changeFormatDate(optionsRequest.data));
    }
    // else if (optionsRequest.status === "empty") {
    //   setMessages([
    //     {
    //       code: "-",
    //       date: "-",
    //       description: "-",
    //       id: 1,
    //       seen: true,
    //       title: "-",
    //       type: "-",
    //     },
    //   ]);

    //   setResponseStatus({
    //     status: "error",
    //     message: "Данных не получено",
    //   });
    // }
    else if (optionsRequest.status === "error") {
      setMessages([]);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadNameInst(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({ nameInstallation: optionsRequest.data.name });
    } else if (optionsRequest.status === "empty") {
      setResponseStatus({
        status: "error",
        message: "Данных не получено",
      });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadUnreadMessagesCount(id) {
    const url = `${API_SERVER_ADDRESS}/${id}/UnreadMessageCount`;
    // let response = await fetch(url);
    // let unreadMessagesCount = await response.json();
    const optionsRequest = await getDataInstallation(url);
    dataModel.setData({ unreadMessagesCount: optionsRequest.data });
    //  if(optionsRequest.status === "unauthorized"){
    //   return "unauthorized";
    // };
    // if (optionsRequest.status === "success") {
    // } else if (optionsRequest.status === "empty") {
    //   dataModel.setData({ unreadMessagesCount: 0 });

    //   setResponseStatus({
    //     status: "error",
    //     message: "Данных не получено",
    //   });
    // } else if (optionsRequest.status === "error") {
    //   setResponseStatus({
    //     status: "error",
    //     message: "Произошла ошибка: сервер не отвечает",
    //   });
    // }
  }

  async function loadCurrentParametersInst(id, currentValueUrl) {
    const url = `${API_SERVER_ADDRESS}/${id}/${currentValueUrl}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      setDataCurrentStateInst(optionsRequest.data);
    } else if (optionsRequest.status === "empty") {
      setDataCurrentStateInst({
        tempWater: "-",
        conductivityPerm: "-",
        p1: "-",
        p2: "-",
        deltaP1: "-",
        p3: "-",
        p4: "-",
        deltaP2: "-",
        ratePerm: "-",
        drain: "-",
        circulation: "-",
      });
      setResponseStatus({
        status: "error",
        message: "Данных не получено",
      });
    } else if (optionsRequest.status === "error") {
      setDataCurrentStateInst({
        tempWater: "-",
        conductivityPerm: "-",
        p1: "-",
        p2: "-",
        deltaP1: "-",
        p3: "-",
        p4: "-",
        deltaP2: "-",
        ratePerm: "-",
        drain: "-",
        circulation: "-",
      });
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadCurrentMonitoringCycle(pathName) {
    const url = `${API_SERVER_ADDRESS}/${pathName}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      return optionsRequest.data;
    } else if (optionsRequest.status === "empty") {
      return {
        startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
        endDate: new Date().toISOString(),
      };
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadDataPageCosts(pathname) {
    const url = `${API_SERVER_ADDRESS}/${pathname}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      return optionsRequest.data;
    } else if (optionsRequest.status === "empty") {
      setResponseStatus({
        status: "error",
        message: "Данных нет",
      });
      // return {};
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  // async function loadDataChartCosts(installationId, newMonitoringCycle, costsURL) {
  //   let startDate = newMonitoringCycle?.minDate;
  //   let endDate = newMonitoringCycle?.maxDate;
  //   if (!newMonitoringCycle) {
  //     const getCurrentMonitoringCycleURL = `${API_SERVER_ADDRESS}/${installationId}/GetAnalizePeriod`;
  //     const responseMonitoringCycle = await getDataInstallation(getCurrentMonitoringCycleURL);

  //     if (responseMonitoringCycle.status === "success") {
  //       dataModel.setData({
  //         currentMonitoringCycle: responseMonitoringCycle.data,
  //       });
  //       startDate = responseMonitoringCycle.data.startDate;
  //       endDate = responseMonitoringCycle.data.endDate;
  //     } else if (responseMonitoringCycle.status === "empty") {
  //       dataModel.setData({
  //         currentMonitoringCycle: { disableInputDate: true },
  //       });
  //       console.log("optionsRequest.data", optionsRequest.data);

  //       dataModel.setData({ dataChartCosts: [] });

  //       setResponseStatus({
  //         status: "error",
  //         message: "Отсутствует мониторинг цикла",
  //       });
  //       return;
  //     } else if (responseMonitoringCycle.status === "error") {
  //       dataModel.setData({
  //         currentMonitoringCycle: { disableInputDate: true },
  //       });
  //       dataModel.setData({ dataChartCosts: [] });

  //       setResponseStatus({
  //         status: "error",
  //         message: "Произошла ошибка: сервер не отвечает",
  //       });
  //       return;
  //     }
  //   }

  //   const getDataChartCostsURL = `${API_SERVER_ADDRESS}/${installationId}/${costsURL}?Start=${startDate}&End=${endDate}`;
  //   const optionsRequest = await getDataInstallation(getDataChartCostsURL);
  // if(optionsRequest.status === "unauthorized"){
  //   return "unauthorized";
  // }
  //   if (optionsRequest.status === "success") {
  //     if (costsURL === "GetRelativeAllExpenses" || costsURL === "GetRelativeExpenses") {
  //       dataModel.setData({
  //         dataChartCosts: optionsRequest.data,
  //       });
  //     }
  //     if (costsURL === "GetTotalExpenses") {
  //       dataModel.setData({
  //         dataTotalCosts: optionsRequest.data,
  //       });
  //     } else if (costsURL === "GetTotalModelExpenses") {
  //       dataModel.setData({
  //         dataTotalModelExpenses: optionsRequest.data,
  //       });
  //     } else if (costsURL === "GetExpenses" || costsURL === "GetModelExpenses") {
  //       dataModel.setData({
  //         dataOnDayCosts: optionsRequest.data,
  //       });
  //     }

  //     setResponseStatus({
  //       status: "success",
  //       message: `Данные с ${format(new Date(startDate), "dd/MM/yyyy")} по ${format(
  //         new Date(endDate),
  //         "dd/MM/yyyy"
  //       )} загружены`,
  //     });
  //   } else if (optionsRequest.status === "empty") {
  //     dataModel.setData({ dataChartCosts: [] });
  //     dataModel.setData({ dataTotalCosts: [] });
  //     dataModel.setData({ dataOnDayCosts: [] });
  //     dataModel.setData({ dataTotalModelExpenses: [] });
  //     setResponseStatus({
  //       status: "error",
  //       message: "Данных нет",
  //     });
  //   } else if (optionsRequest.status === "error") {
  //     dataModel.setData({ dataTotalCosts: [] });
  //     dataModel.setData({ dataChartCosts: [] });
  //     dataModel.setData({ dataOnDayCosts: [] });
  //     dataModel.setData({ dataTotalModelExpenses: [] });
  //     setResponseStatus({
  //       status: "error",
  //       message: "Произошла ошибка: сервер не отвечает",
  //     });
  //   }
  // }

  async function loadDataWash(allDataWashURL) {
    const url = `${API_SERVER_ADDRESS}/${allDataWashURL}`;
    const optionsRequest = await getDataInstallation(url);
    // console.log('allDataWashURL :>> ', allDataWashURL);
    if (optionsRequest.status === "success") {
      dataModel.setData({ dataWash: optionsRequest.data });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({ dataWash: [] });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadLastDateEvent(id) {
    // const urls = [
    //   'LastFilterChanged',
    //   'LastMembraneWashed',
    //   'LastInstallationStart',
    //   'LastInstallationStop',
    // ];

    // const tempState = {};

    // for (let operationURL of urls) {
    //   const url = `${API_SERVER_ADDRESS}/${id}/${operationURL}`;
    //   const dataEventInstallation = await getDataInstallation(url);

    //   tempState[operationURL] = dataEventInstallation.date;
    // }

    // setDataStateStatus(tempState);)
    await Promise.all(
      Object.keys(CONFIG_JOURNAL_EVENTS).map(async (nameEvent) => {
        const lastDateURL = CONFIG_JOURNAL_EVENTS[nameEvent].lastDateURL;
        const url = `${API_SERVER_ADDRESS}/${id}/${lastDateURL}`;
        const optionsRequest = await getDataInstallation(url);
        if (optionsRequest.status === "unauthorized") {
          return "unauthorized";
        }
        if (optionsRequest.status === "success") {
          CONFIG_JOURNAL_EVENTS[nameEvent].date = format(
            new Date(optionsRequest.data?.date),
            "dd.MM.yyyy"
          );
        } else if (optionsRequest.status === "empty") {
          CONFIG_JOURNAL_EVENTS[nameEvent].date = "--.--.----";
        } else if (optionsRequest.status === "error") {
          CONFIG_JOURNAL_EVENTS[nameEvent].date = "--.--.----";

          setResponseStatus({
            status: "error",
            message: "Произошла ошибка: сервер не отвечает",
          });
        }
      })
    );

    dataModel.setData({
      dataEvents: CONFIG_JOURNAL_EVENTS,
    });
  }

  async function loadAllDatesEvent(loadAllDateURL) {
    const url = `${API_SERVER_ADDRESS}/${loadAllDateURL}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({ allDateEvent: optionsRequest.data });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({ allDateEvent: [] });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }
  async function loadWorkingState(pathName, date) {
    const url = `${API_SERVER_ADDRESS}/${pathName}/${date}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataWorkingState: changeFormatDateForPageChart(optionsRequest.data, date),
      });
      setResponseStatus({
        status: "success",
        message: `Данные ${date === "middlestates" ? "средних значений" : "за: " + date} загружены`,
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataWorkingState: [],
      });
      setResponseStatus({
        status: "error",
        message: `Данные ${
          date === "middlestates" ? "средних значений" : "за: " + date
        } отсутствуют`,
      });
    } else if (optionsRequest.status === "error") {
      dataModel.setData({
        dataWorkingState: [],
      });
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadRinsingState(pathName, date) {
    const url = `${API_SERVER_ADDRESS}/${pathName}/${date}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataRinsingState: changeFormatDateForPageChart(optionsRequest.data, date),
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataRinsingState: [],
      });
      setResponseStatus({
        status: "error",
        message: `Данные ${
          date === "middlestates" ? "средних значений" : "за: " + date
        } отсутствуют`,
      });
    } else if (optionsRequest.status === "error") {
      dataModel.setData({
        dataRinsingState: [],
      });
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function loadDataMembranWash(URL) {
    const url = `${API_SERVER_ADDRESS}/${URL}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataMembranWash: optionsRequest.data,
      });
      setResponseStatus({
        status: "success",
        message: "Данные получены",
      });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataMembranWash: null,
      });
      setResponseStatus({
        status: "error",
        message: "Данных не получено",
      });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
    return optionsRequest.data;
  }

  async function loadDataPump(URL) {
    const url = `${API_SERVER_ADDRESS}/${URL}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataPump: optionsRequest.data,
      });
      // setResponseStatus({
      //   status: "success",
      //   message: "Данные получены",
      // });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataPump: null,
      });
      setResponseStatus({
        status: "error",
        message: "Данных не получено",
      });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }

    await optionsRequest.data;
  }
  async function loadDataAntiscalant(URL) {
    const url = `${API_SERVER_ADDRESS}/${URL}`;
    const optionsRequest = await getDataInstallation(url);

    if (optionsRequest.status === "success") {
      dataModel.setData({
        dataAntiscalant: optionsRequest.data,
      });
      // setResponseStatus({
      //   status: "success",
      //   message: "Данные получены",
      // });
    } else if (optionsRequest.status === "empty") {
      dataModel.setData({
        dataAntiscalant: null,
      });
      setResponseStatus({
        status: "error",
        message: "Данных не получено",
      });
    } else if (optionsRequest.status === "error") {
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }

    await optionsRequest.data;
  }

  async function updateDataAntiscalant(data, updateDataURL, loadDataURL) {
    const url = `${API_SERVER_ADDRESS}/${updateDataURL}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        console.log("Обновление данных произошло успешно");
        loadDataAntiscalant(loadDataURL);
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }
  async function updateExpensesModel(data, updateDataURL) {
    const url = `${API_SERVER_ADDRESS}/${updateDataURL}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        console.log("Обновление данных произошло успешно");
        // loadDataAntiscalant(loadDataURL);
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function updateDataPump(data, updateDataURL, loadDataURL) {
    const url = `${API_SERVER_ADDRESS}/${updateDataURL}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        console.log("Обновление данных произошло успешно");
        loadDataPump(loadDataURL);
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function updateDataMembranWash(data, updateDataURL, loadDataURL) {
    const url = `${API_SERVER_ADDRESS}/${updateDataURL}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        console.log("Обновление данных произошло успешно");
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function updateDataInst(data, setURL) {
    const url = `${API_SERVER_ADDRESS}/${setURL}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        console.log("Обновление данных произошло успешно");
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }

    dataModel.setData({
      dataState: data,
    });
  }
  async function updateValuesRisingParams(data, updateURL) {
    const url = `${API_SERVER_ADDRESS}/${updateURL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        console.log("Обновление данных произошло успешно");
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }
  async function updateEconomicAnalysis(data, pathname) {
    const url = `${API_SERVER_ADDRESS}/${pathname}`;
    try {
      // debugger;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        console.log("Обновление данных произошло успешно");
      } else {
        // dataModel.setData({
        //   dataEconomicAnalysis: {
        //     permiat: {},
        //     wash: {},
        //     electricity: {},
        //     antiscalant: {},
        //     membrane: {},
        //     drain: {},
        //     chemicalWash: {},
        //   },
        // });
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      // dataModel.setData({
      //   dataEconomicAnalysis: {
      //     permiat: {},
      //     wash: {},
      //     electricity: {},
      //     antiscalant: {},
      //     membrane: {},
      //     drain: {},
      //     chemicalWash: {},
      //   },
      // });
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function updateWash(data, addDataWashURL, allDataWashURL) {
    const url = `${API_SERVER_ADDRESS}/${addDataWashURL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        console.log("Обновление данных произошло успешно");
        loadDataWash(allDataWashURL);
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function updateDataWash(data, updateDataWashURL, allDataWashURL) {
    const url = `${API_SERVER_ADDRESS}/${updateDataWashURL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        console.log("response :>> ", response.status);
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        console.log("Обновление данных произошло успешно");
        loadDataWash(allDataWashURL);
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function updateDataStates(data, setURL, installationId) {
    const url = `${API_SERVER_ADDRESS}/${setURL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });

        // if (setURL.indexOf("Start") !== -1) {
        //   dataModel.setData({
        //     dataStartState: dataStartState
        //       .concat(data)
        //       .sort((a, b) =>
        //         Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
        //       ),
        //   });
        // } else {
        //   dataModel.setData({
        //     dataZeroState: dataZeroState
        //       .concat(data)
        //       .sort((a, b) =>
        //         Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
        //       ),
        //   });
        // }
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
    loadDataStartStates(installationId);
    loadDataZeroStates(installationId);
  }

  async function updateDataCurrentStates(data, setURL, installationId) {
    const url = `${API_SERVER_ADDRESS}/${setURL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });

        // if (setURL.indexOf("Start") !== -1) {
        //   dataModel.setData({
        //     dataStartState: dataStartState.concat(data).sort((a, b) =>  (Date.parse(a.date) <  Date.parse(b.date)) ? 1 : -1),
        //   });
        // } else {
        //   dataModel.setData({
        //     dataZeroState: dataZeroState.concat(data).sort((a, b) =>  (Date.parse(a.date) <  Date.parse(b.date)) ? 1 : -1),
        //   });
        // }
      } else if (response.status === 500 || response.status === 404) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
    loadDataStartStates(installationId);
    loadDataZeroStates(installationId);
  }

  async function updateFormula(data, setURL) {
    const url = `http://217.21.59.101:30000/${setURL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function addDateEventsInst(date, changeDateEventURL, getAllDateEventURL) {
    let url = `${API_SERVER_ADDRESS}/${changeDateEventURL}`;

    let formData = new FormData();
    formData.append("date", date);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        // mode: 'no-cors',
        headers: {
          accept: "text/plain",
          Authorization: "Bearer " + localStorage.getItem("token"),
          // "Content-Disposition": "form-data;" name="date"
          // "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        loadAllDatesEvent(getAllDateEventURL);
      } else if (response.status === 500 || 404 || 405) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function updateMessageStatus(idMessage, installationId) {
    await setStatusMessage(idMessage);
    const updatedMessages = messages.map((message) => {
      if (message.id !== idMessage) {
        return message;
      }

      return { ...message, seen: true };
    });

    setMessages(updatedMessages);
    loadUnreadMessagesCount(installationId);
  }

  async function deleteValueWash(pieceUrl, data, allDataWashURL) {
    const url = `${API_SERVER_ADDRESS}/${pieceUrl}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно удаленны",
        });
      } else if (response.status !== 200) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
    loadDataWash(allDataWashURL);
  }

  async function deleteValueState(pieceUrl, installationId) {
    const url = `http://217.21.59.101:30000/States/${pieceUrl}`;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно удаленны",
        });
        loadDataStartStates(installationId);
        loadDataZeroStates(installationId);
      } else if (response.status !== 200) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
      // if(optionsRequest.status === "unauthorized"){
      //   return "unauthorized";
      // }
    } // if (optionsRequest.status === "success") {
    //   setResponseStatus({
    //     status: "success",
    //     message: "Данные успешно удаленны",
    //   });
    // } else if (optionsRequest.status === "error") {
    //   setResponseStatus({
    //     status: "error",
    //     message: "Произошла ошибка: сервер не отвечает",
    //   });
    // }
  }

  // TODO EVENT_PAGE

  async function updateDateEvent(pieceUrl, data, getAllDateEventURL) {
    const url = `${API_SERVER_ADDRESS}/${pieceUrl}`;
    let formData = new FormData();

    Object.keys(data).forEach((element) => {
      formData.append(element, data[element]);
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });
        loadAllDatesEvent(getAllDateEventURL);
      } else if (response.status !== 200) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  async function requestClearDataEvents(installationId) {
    const url = `${API_SERVER_ADDRESS}/${installationId}/ClearCurrentMonitoring`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(installationId),
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        setResponseStatus({
          status: "success",
          message: "Данные успешно обновлены",
        });

        loadLastDateEvent(installationId);
      } else if (response.status === 500) {
        setResponseStatus({
          status: "error",
          message: "Произошла ошибка: сервер не отвечает",
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setResponseStatus({
        status: "error",
        message: "Произошла ошибка: сервер не отвечает",
      });
    }
  }

  return {
    dataRisingParams,
    dataWash,
    dataMembranWash,
    dataPump,
    dataAntiscalant,
    dataChartCosts,
    dataOnDayCosts,
    dataTotalModelExpenses,
    allDateEvent,
    dataEvents,
    dataStartState,
    dataZeroState,
    dataStateStatus,
    nameInstallation,
    dataState,
    dataRinsingState,
    dataWorkingState,
    messages,
    dataCurrentStateInst,
    unreadMessagesCount,
    // error,
    responseStatus,
    currentMonitoringCycle,
    dataTotalCosts,
    dataEconomicAnalysis,
    dateEconomicCosts,
    dataChartEconomicAnalysis,
    dataRegulationsModel,
    loadDataRegulationsModel,
    loadDataRisingParams,
    loadDataMembranWash,
    loadDataAntiscalant,
    loadDataPump,
    loadCurrentMonitoringCycle,
    // loadDataChartCosts,
    loadDataPageCosts,
    loadDataWash,
    loadAllDatesEvent,
    loadDataForFormulasInst,
    loadDataStartStates,
    loadDataZeroStates,
    loadDataSettingInstallation,
    loadDataNormalizationAuto,
    loadUnreadMessagesCount,
    loadDataNormalization,
    loadLastDateEvent,
    loadDataStateInst,
    loadRinsingState,
    loadWorkingState,
    loadCurrentParametersInst,
    loadNameInst,
    loadMessages,
    loadDateEconomicCosts,
    loadDataChartEconomicAnalysis,
    loadDataEconomicAnalysis,
    updateEconomicAnalysis,
    updateWash,
    updateMessageStatus,
    addDateEventsInst,
    updateDataMembranWash,
    updateDataInst,
    updateFormula,
    updateDataStates,
    updateDataCurrentStates,
    deleteValueState,
    deleteValueWash,
    updateDateEvent,
    requestClearDataEvents,
    updateDataWash,
    updateDataPump,
    updateDataAntiscalant,
    updateExpensesModel,
    updateValuesRisingParams,
  };
}
