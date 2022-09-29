export const API_CONFIG = {
  // PAGE
  // COMMON
  // OPERATOR
  // ADMIN
  // PAGE Header
  getNameInst: (id) => ({ PATH: `/installation/${id}/`, METHOD: "GET" }),
  getUnreadMessagesCount: (id) => ({
    PATH: `/installation/${id}/messages/unread-count`,
    METHOD: "GET",
  }),

  // PAGE АРХИВ
  // COMMON
  getDayStates: (id, date) => ({ PATH: `/installation/${id}/daystates/${date}`, METHOD: "GET" }),

  getRinsingStates: (id, date) => ({
    PATH: `/installation/${id}/GetRinsingStates/${date}`,
    METHOD: "GET",
  }),

  getWorkingStates: (id, date) => ({
    PATH: `/installation/${id}/GetWorkingStates/${date}`,
    METHOD: "GET",
  }),

  // PAGE текущие значения
  // COMMON
  getCurrentState: (id) => ({ PATH: `/installation/${id}/currentstate`, METHOD: "GET" }),
  // PAGE текущие значения
  // COMMON
  allMiddleStates: (id) => ({ PATH: `/installation/${id}/AllMiddleStates`, METHOD: "GET" }),
  allNormMiddleStates: (id) => ({ PATH: `/installation/${id}/AllNormMiddleStates`, METHOD: "GET" }),

  // PAGE СТРАНИЦА ЭКОНОМ. АНАЛИЗ____________ start____________

  // COMMON
  updateSourcesRates: (id) => ({
    PATH: `/installation/${id}/UpdateSourcesRates`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }), // update фактических Таблиц ----------------- оператор
  // OPERATOR
  getFactRelativeCosts: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/FactRelativeCosts?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // получение для фактических График ----------------- оператор

  getFactTotalCosts: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/FactTotalCosts?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // получение для фактических Таблица ----------------- оператор

  // ADMIN
  getAllTotalCosts: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/AllTotalCosts?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // получение для фактических  и модель ТАБЛИЦА ----------------- АДМИН

  getAllRelativeCosts: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/AllRelativeCosts?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // получение для фактических  и модель ГРАФИК ----------------- АДМИН
  // СТРАНИЦА ЭКОНОМ. АНАЛИЗ____________ end____________

  // PAGE - РАСХОДЫ____________ start____________

  // COMMON
  // OPERATOR
  getRelativeExpenses: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/GetRelativeExpenses?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // график

  // ADMIN
  getRelativeAllExpenses: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/GetRelativeAllExpenses?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // график

  getTotalExpenses: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/GetTotalExpenses?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // Суммарные расходы

  getTotalModelExpenses: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/GetTotalModelExpenses?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // Суммарные расходы (модель)

  getExpensesModel: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/GetExpensesModel?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // Регламент (модель)

  getExpenses: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/GetExpenses?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // Расходы по датам (Фактические)

  getModelExpenses: (id, { startDate, endDate }) => ({
    PATH: `/installation/${id}/GetModelExpenses?Start=${startDate}&End=${endDate}`,
    METHOD: "GET",
  }), // Расходы по датам (Модель)

  updateExpensesModel: (id) => ({
    PATH: `/installation/${id}/UpdateExpensesModel`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }), // Update таблицу Регламент (модель):
  // PAGE - РАСХОДЫ____________ end____________

  // PAGE - Журнал событий____________ start___________

  clearCurrentMonitoring: (id) => ({
    PATH: `/installation/${id}/ClearCurrentMonitoring`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  // PAGE - Журнал событий____________ end____________

  // PAGE - Журнал событий - замена МЕМБРАН____________ start___________
  addMembranWash: (id) => ({
    PATH: `/installation/${id}/AddMembranWash`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getAllMembranWash: (id) => ({ PATH: `/installation/${id}/GetAllMembranWash`, METHOD: "GET" }),
  updateMembranWash: (id) => ({
    PATH: `/installation/${id}/UpdateMembranWash`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  deleteMembranWashEvent: (id) => ({
    PATH: `/installation/${id}/DelMembranWashEvent`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),

  getMembranWashes: (id) => ({ PATH: `/installation/${id}/GetMembranWashes`, METHOD: "GET" }),
  lastMembranWash: (id) => ({ PATH: `/installation/${id}/LastMembranWash`, METHOD: "GET" }),
  lastMembranWashEvent: (id) => ({
    PATH: `/installation/${id}/LastMembranWashEvent`,
    METHOD: "GET",
  }),
  // PAGE - Журнал событий - замена МЕМБРАН____________ end____________

  // PAGE - Журнал стартовых значений - ___________ start____________
  getAllStartStates: (id) => ({ PATH: `/installation/${id}/AllStartStates`, METHOD: "GET" }),
  addStartState: (id) => ({
    PATH: `/installation/${id}/AddStartState`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  updateStartState: (id) => ({
    PATH: `/installation/${id}/UpdateStartState`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  deleteStartState: (id) => ({ PATH: `/States/${id}/DelStartState`, METHOD: "GET" }),

  getAllZeroStates: (id) => ({ PATH: `/installation/${id}/GetAllZeroStates`, METHOD: "GET" }),
  addZeroState: (id) => ({
    PATH: `/installation/${id}/AddZeroState`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  updateZeroState: (id) => ({
    PATH: `/installation/${id}/UpdateZeroState`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  deleteZeroState: (stateid) => ({ PATH: `/States/${stateid}/DelZeroState`, METHOD: "GET" }),

  // PAGE - Журнал стартовых значений - ___________ end ____________
  // PAGE - Регламент - ___________ start ____________
  getMembraneParams: (id) => ({ PATH: `/installation/${id}/GetMembranParams`, METHOD: "GET" }),
  updateMembraneParams: (id) => ({
    PATH: `/installation/${id}/UpdateMembranParams`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getMembraneWashParams: (id) => ({
    PATH: `/installation/${id}/GetMembranWashParams`,
    METHOD: "GET",
  }),
  updateMembraneWashParams: (id) => ({
    PATH: `/installation/${id}/UpdateMembranWashParams`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getDataServiceForRegulation: (id) => ({
    PATH: `/installation/${id}/service-view-interval`,
    METHOD: "GET",
  }),
  updateDataServiceForRegulation: (id) => ({
    PATH: `/installation/${id}/service-view-interval`,
    METHOD: "PUT",
    HEADERS: { "Content-Type": "application/json" },
  }),
  // PAGE - Регламент - ___________ end ____________
  // PAGE - Настройка журналов ___________ start ____________
  getSettings: (id) => ({ PATH: `/installation/${id}/GetSettings`, METHOD: "GET" }),
  updateSettings: () => ({
    PATH: `/installation/UpdateSettings`,
    METHOD: "PUT",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getRinsingParams: (id) => ({ PATH: `/installation/${id}/GetRisingParams`, METHOD: "GET" }),
  updateRinsingParams: (id) => ({
    PATH: `/installation/${id}/UpdateRisingParams`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  // PAGE - Настройка журналов - ___________ end ____________

  // PAGE - Настройка алгоритмов ___________ start ____________
  getDataFormals: (id) => ({ PATH: `/installation/${id}/formulas`, METHOD: "GET" }),
  // updateFormula: (id) => ({
  //   PATH: `/formula/update`,
  //   METHOD: "POST",
  //   HEADERS: { "Content-Type": "application/json" },
  // }),
  updateFormula: (id) => ({
    PATH: `/installation/${id}/formula`,
    METHOD: "PUT",
    HEADERS: { "Content-Type": "application/json" },
  }),

  // PAGE - Настройка алгоритмов - ___________ end ____________
  // PAGE - Описание установки ___________ start ____________
  getAntiscalantParams: (id) => ({
    PATH: `/installation/${id}/GetAntiscalantParams`,
    METHOD: "GET",
  }),
  updateAntiscalantParams: (id) => ({
    PATH: `/installation/${id}/UpdateAntiscalantParams`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getPumpParams: (id) => ({ PATH: `/installation/${id}/GetPumpParams`, METHOD: "GET" }),
  updatePumpParams: (id) => ({
    PATH: `/installation/${id}/UpdatePumpParams`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getStages: (id) => ({ PATH: `/installation/${id}/stages`, METHOD: "GET" }),
  addStage: (id) => ({
    PATH: `/installation/${id}/stages`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  updateStage: (id) => ({
    PATH: `/installation/${id}/stages`,
    METHOD: "PUT",
    HEADERS: { "Content-Type": "application/json" },
  }),
  deleteStage: (id, stageId) => ({
    PATH: `/installation/${id}/stages/${stageId}`,
    METHOD: "DELETE",
  }),
  // PAGE - Описание установки ___________ end ____________
  // PAGE - Документы ___________ start ____________
  getFiles: (id) => ({
    PATH: `/installation/${id}/files`,
    METHOD: "GET",
  }),
  updateFile: (id) => ({
    PATH: `/installation/${id}/files`,
    METHOD: "PUT",
    HEADERS: { "Content-Type": "application/json" },
  }),
  deleteFile: (id, fileId) => ({
    PATH: `/installation/${id}/files/${fileId}`,
    METHOD: "DELETE",
  }),
  sendFiles: (id) => ({
    PATH: `/installation/${id}/files`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "multipart/form-data" },
  }),
  // PAGE - Документы ___________ end ____________

  // PAGE - CreateInstallation ___________ start ____________
  createInstallation: (companyId) => ({
    PATH: `/Installation/${companyId}`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getAllCompanies: () => ({
    PATH: `/Companies/all`,
    METHOD: "GET",
  }),
  // PAGE - CreateInstallation ___________ end ____________

  // PAGE - createCompany ___________ start ____________
  createCompany: () => ({
    PATH: `/Companies`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  // PAGE - createCompany ___________ end ____________

  // PAGE - createUser ___________ start ____________
  createUser: (installationId) => ({
    PATH: `/Installation/${installationId}/user`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getAllUsers: (companyId) => ({
    PATH: `/Companies/${companyId}/users`,
    METHOD: "GET",
  }),
  assignUser: (installationId, email) => ({
    PATH: `/Installation/${installationId}/user/${email}`,
    METHOD: "GET",
  }),
  deleteUser: (email) => ({
    PATH: `users/${email}`,
    METHOD: "DELETE",
    HEADERS: { "Content-Type": "application/json" },
  }),

  // PAGE - createUser ___________ end ____________
  // PAGE - СЕРВИСЫ ___________ start ____________
  getService: (installationId) => ({
    PATH: `/installation/${installationId}/service-info`,
    METHOD: "GET",
  }),
  // PAGE - СЕРВИСЫ ___________ end ____________
  getAnalyzePeriod: (id) => ({ PATH: `/installation/${id}/GetAnalizePeriod`, METHOD: "GET" }),
  getTotalCosts: (id) => ({ PATH: `/installation/${id}/GetTotalCosts`, METHOD: "GET" }),
  getRelativeCosts: (id) => ({ PATH: `/installation/${id}/GetRelativeCosts`, METHOD: "GET" }),
  installation: () => ({ PATH: `/installation`, METHOD: "GET" }),
  single: (id) => ({ PATH: `/installation/${id}/single`, METHOD: "GET" }),
  updateInstallation: (id) => ({
    PATH: `/installation/${id}/update`,
    METHOD: "PUT",
    HEADERS: { "Content-Type": "application/json" },
  }),

  installationData: (id) => ({ PATH: `/installation/${id}`, METHOD: "GET" }),
  allIntervalStates: (id) => ({ PATH: `/installation/${id}/AllintervalStates`, METHOD: "GET" }),
  addIntervalState: (id) => ({
    PATH: `/${id}/AddIntervalState`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  updateEvent: (id) => ({
    PATH: `/installation/${id}/UpdateEvent`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  deleteEvent: (id) => ({
    PATH: `/installation/${id}/DeleteEvent`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  addFilterChangedEvent: (id) => ({
    PATH: `/installation/${id}/AddFilterChangedEvent`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getFilterChangedEvents: (id) => ({
    PATH: `/installation/${id}/GetFilterChangedEvents`,
    METHOD: "GET",
  }),
  getLastFilterChanged: (id) => ({
    PATH: `/installation/${id}/GetLastFilterChanged`,
    METHOD: "GET",
  }),
  addWorkTypeChanged: (id) => ({
    PATH: `/installation/${id}/AddWorkTypeChanged`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getWorkTypeChangedEvents: (id) => ({
    PATH: `/installation/${id}/GetWorkTypeChangedEvents`,
    METHOD: "GET",
  }),
  getLastWorkTypeChangedEvent: (id) => ({
    PATH: `/installation/${id}/GetLastWorkTypeChangedEvent`,
    METHOD: "GET",
  }),
  addMembraneChangedEvent: (id) => ({
    PATH: `/installation/${id}/AddMembranChangedEvent`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getMembraneChangedEvents: (id) => ({
    PATH: `/installation/${id}/GetMembranChangedEvents`,
    METHOD: "GET",
  }),
  getLastMembraneChangedEvent: (id) => ({
    PATH: `/installation/${id}/GetLastMembranChangedEvent`,
    METHOD: "GET",
  }),
  addRemoteViewEvent: (id) => ({
    PATH: `/installation/${id}/AddRemoteViewEvent`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getRemoteViewEvents: (id) => ({ PATH: `/installation/${id}/GetRemoteViewEvents`, METHOD: "GET" }),
  getLastRemoteViewEvent: (id) => ({
    PATH: `/installation/${id}/GetLastRemoteViewEvent`,
    METHOD: "GET",
  }),
  addServiceEvent: (id) => ({
    PATH: `/installation/${id}/AddServiceEvent`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  getServiceEvents: (id) => ({ PATH: `/installation/${id}/GetServiceEvents`, METHOD: "GET" }),
  getLastServiceEvent: (id) => ({ PATH: `/installation/${id}/GetLastServiceEvent`, METHOD: "GET" }),
  //  :() => ({ PATH: `/messages`,
  //   METHOD: ["ge}t", "PUT"],}),
  getInstallationMessages: (id) => ({
    PATH: `/installation/${id}/messages`,
    METHOD: "GET",
  }),
  seenMessage: (installationId, messageId) => ({
    PATH: `/installation/${installationId}/messages/${messageId}`,
    METHOD: "PUT",
    HEADERS: { "Content-Type": "application/json" },
  }),
  //  getMessage:(id) => ({ PATH: `/messages/${id}`,
  //   METHOD: ["GET", "delete"],}),
  // messageAll:(id) => ({ PATH: `/installation/${id}/message`,
  // METHOD: "POST", HEADERS: { "Content-Type": "application/json" },),
  addMiddleState: (id) => ({
    PATH: `/installation/${id}/AddMiddleState`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  calculateMiddleStates: (id) => ({ PATH: `/${id}/CalculateMiddleStates`, METHOD: "GET" }),
  getCurrentMonitoringCycle: (id) => ({
    PATH: `/installation/${id}/GetCurrentMonitoringCycle`,
    METHOD: "GET",
  }),

  getRisingParams: (id) => ({ PATH: `/installation/${id}/GetRisingParams`, METHOD: "GET" }),
  updateRisingParams: (id) => ({
    PATH: `/installation/${id}/UpdateRisingParams`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),
  // dayStates :(id) => ({ PATH: `/installation/${id}/daystates`,
  //   METHOD: "GET"}),
  washStates: (id) => ({ PATH: `/installation/${id}/washStates`, METHOD: "GET" }),
  //  :(id) => ({ PATH: `/states/${id}/add`,
  // METHOD: "POST", HEADERS: { "Content-Type": "application/json" },),
  userInitialize: () => ({ PATH: `/user/initialize`, METHOD: "GET" }),
  login: () => ({
    PATH: `/users/login`,
    METHOD: "POST",
    HEADERS: { "Content-Type": "application/json" },
  }),

  delZeroState: (stateid) => ({ PATH: `/States/${stateid}/DelZeroState`, METHOD: "GET" }),
};
