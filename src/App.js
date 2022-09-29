import { Suspense, useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
// import PulseLoader from "react-spinners/PulseLoader";
import { Context } from "./";

// import { makeAutoObservable, toJS } from "mobx";
// import { Navigation } from "./Components/common/Navigation/";
import { CurrentParametersInstallation } from "./Components/common/CurrentParametersInstallation/";
import { JournalParameters } from "./Components/common/JournalParameters/";
import { JournalEvents } from "./Components/common/JournalEvents/";
import { Archive } from "./Components/common/Archive/";
import { EconomicAnalysis } from "./Components/common/EconomicAnalysis/";
import { FilterChanged } from "./Components/common/FilterChanged/";
import { MembraneChanged } from "./Components/common/MembraneChanged/";
import { MembraneWashed } from "./Components/common/MembraneWashed/";
import { RemoteView } from "./Components/common/RemoteView/";
import { WorkTypeChanged } from "./Components/common/WorkTypeChanged/";
import { AutoNormalization } from "./Components/common/AutoNormalization/";
import { ManualNormalization } from "./Components/common/ManualNormalization/";
import { Normalization } from "./Components/common/Normalization/";
import { SettingAlgorithms } from "./Components/common/SettingAlgorithms/";
import { SettingJournals } from "./Components/common/SettingJournals/";
import { JournalStartStates } from "./Components/common/JournalStartStates/";
// import { FilterableMessageTable } from "./Components/common/TableMessages/components/FilterableMessageTable";
import { EconomicAnalysisOperator } from "./Components/operator/EconomicAnalysis/";
import { CostsAdmin } from "./Components/admin/Costs/";
import { CostsOperator } from "./Components/operator/Costs/";
import { MainAdmin } from "./Components/admin/MainAdmin";
import { Description } from "./Components/common/Description/";
import { Documents } from "./Components/common/Documents/";
import { Service } from "./Components/common/Service/";
import LoginPage from "./Components/common/LoginPage/LoginPage";
import { NotFoundPage } from "./Components/common/NotFoundPage/NotFoundPage ";
import { Regulations } from "./Components/common/Regulations/";
import { SettingInstallation } from "./Components/admin/SettingInstallation/";
// import store from "./pageOperators/Form/store/store";
import { observer } from "mobx-react-lite";
// import User from "./User";
// import Admin from "./Admin";
import { css } from "@emotion/react";
import { ProtectedRoute } from "./Components/common/PrivateRoute/ProtectedRoute";
import { RestrictedPage } from "./Components/common/PrivateRoute/RestrictedPage";
import { ROLES } from "./constants";
import { PageAdmin } from "./Pages/PageAdmin";
import { PageOperator } from "./Pages/PageOperator";
import { Messages } from "./Components/common/Messages";

export const override = css`
  display: block;
  margin: 300px auto;
  border-color: red;
  width: 300px;
`;

// function checkAuth(store) {
//   if (localStorage.getItem("token")) {
//     // console.log("load", toJS(store.isLoading));
//     // (async () => {
//     //   await store.checkAuth();
//     // })();
//     store.checkAuth();
//   }
// }

function App() {
  const { store } = useContext(Context);

  (async () => {
    await store.checkAuth();
  })();

  return (
    <>
      <Router>
        <Suspense
        // fallback={<PulseLoader color={"rgb(54, 215, 183)"} loading={true} css={override} size={50} margin={10} />}
        >
          <Routes>
            <Route path={"/restricted-page"} element={<RestrictedPage />} />
            {/* <Route
    path={ROUTES.LOGIN_PAGE}
    element={
      <AuthRoute>
        <LoginPage /> 
      </AuthRoute>
    }
  /> */}
            <Route
              index
              path="/"
              element={
                store.isAuth ? (
                  <Navigate to={`/${store.user?.role.toLowerCase()}/installation/1`} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              index
              path="/login"
              element={
                <LoginPage />
                // <AuthRoute>
                //</AuthRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <CurrentParametersInstallation />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/events"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <JournalEvents />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/messages/"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <Messages />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/archive/:installationId"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <Archive />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/middle-states"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <JournalParameters />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/normalization"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <Normalization />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/normalization/auto"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <AutoNormalization />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/normalization/manual"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <ManualNormalization />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/setting-installation"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <SettingJournals />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/setting-algorithms"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <SettingAlgorithms />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/start-states"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <JournalStartStates />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/events/membrane-washed"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <MembraneWashed />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/events/membrane-changed"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <MembraneChanged />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/events/filter-changed"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <FilterChanged />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/events/work-type-changed"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <WorkTypeChanged />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/events/remote-view"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <RemoteView />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/economic-analysis"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <EconomicAnalysisOperator />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/costs"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <CostsOperator />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            {/* <Route index
      path="/operator/installation/:installationId/costsUser"
    >
  <ProtectedRoute roles={[ROLES.OPERATOR]}>
    <PageOperator>
      <CostsUser/>
    </PageOperator>
    </ProtectedRoute>
}/> */}
            <Route
              index
              path="/operator/installation/:installationId/Description"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <Description />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/documents"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <Documents />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/service-info"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <Service />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/operator/installation/:installationId/regulations"
              element={
                <ProtectedRoute roles={[ROLES.OPERATOR]}>
                  <PageOperator>
                    <Regulations />
                  </PageOperator>
                </ProtectedRoute>
              }
            />
            {/* <Route
              index
              path="/operator/installation/:installationId/main-installations"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <MainInstallations />
                  </PageAdmin>
                </ProtectedRoute>
              }
            /> */}
            <Route
              index
              path="/administrator/setting-installation/:installationId/"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <SettingInstallation />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />

            <Route
              index
              path="/administrator/installation/:installationId/events"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <JournalEvents />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  {/* <Suspense
              fallback={
                <div>Загрузка...</div>
                // <PulseLoader color={"rgb(54, 215, 183)"} loading={true} css={override} size={50} margin={10} />
              }
            > */}
                  <PageAdmin>
                    <CurrentParametersInstallation />
                  </PageAdmin>
                  {/* </Suspense> */}
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/messages/"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <Messages />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/archive/:installationId"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <Archive />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/middle-states"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <JournalParameters />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/normalization"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <Normalization />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/normalization/auto"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <AutoNormalization />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/normalization/manual"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <ManualNormalization />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/setting-installation"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <SettingJournals />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/setting-algorithms"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <SettingAlgorithms />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/start-states"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <JournalStartStates />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/events/membrane-washed"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <MembraneWashed />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/events/membrane-changed"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <MembraneChanged />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/events/filter-changed"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <FilterChanged />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/events/work-type-changed"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <WorkTypeChanged />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/events/remote-view"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <RemoteView />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/economic-analysis"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <EconomicAnalysis />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/costs"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <CostsAdmin />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            {/* <Route index
      path="/administrator/installation/:installationId/costsUser"
    >
  <ProtectedRoute roles={[ROLES.ADMIN]}>
    <PageAdmin>
      <CostsUser/>
    </PageAdmin>
    </ProtectedRoute>
}/> */}
            <Route
              index
              path="/administrator/installation/:installationId/Description"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <Description />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/documents"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <Documents />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />

            <Route
              index
              path="/administrator/installation/:installationId/service-info"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <Service />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/installation/:installationId/Regulations"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin>
                    <Regulations />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/administrator/main"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN]}>
                  <PageAdmin isMainPage={true}>
                    <MainAdmin />
                  </PageAdmin>
                </ProtectedRoute>
              }
            />
            <Route index path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default observer(App);
