import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ROLES, TOASTER } from 'constants/common';
import { ROUTES } from 'constants/routes';

import { Loading } from 'components/shared/Loading';

import { AuthRoute } from 'components/AuthRoute';
import { PrivateRoute } from 'components/PrivateRoute';
import { SessionProvider } from 'components/SessionProvider';

import { LoginPage } from 'components/pages/LoginPage';
import { ArchivePage } from 'components/pages/ArchivePage';
import { ManagersPage } from 'components/pages/ManagersPage';
import { FeedbackPage } from 'components/pages/FeedbackPage';
import { RedirectPage } from 'components/pages/RedirectPage';
import { NotFoundPage } from 'components/pages/NotFoundPage';
import { SettingsPage } from 'components/pages/SettingsPage';
import { TemplatePage } from 'components/pages/TemplatePage';
import { ProjectsPage } from 'components/pages/ProjectsPage';
import { TemplatesPage } from 'components/pages/TemplatesPage';
import { QuestionsPage } from 'components/pages/QuestionsPage';
import { EmployeesPage } from 'components/pages/EmployeesPage';
import { InterviewPage } from 'components/pages/InterviewPage';
import { InterviewsPage } from 'components/pages/InterviewsPage';
import { ProjectInterviewPage } from 'components/pages/ProjectInterviewPage';
import { PassingInterviewPage } from 'components/pages/PassingInterviewPage';
import { ProjectInterviewsPage } from 'components/pages/ProjectInterviewsPage';
import { EmployeeInterviewsPage } from 'components/pages/EmployeeInterviewsPage';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SessionProvider>
        <Routes>
          <Route
            path={ROUTES.LOGIN_PAGE}
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
          <Route
            index
            element={
              <PrivateRoute>
                <RedirectPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN.MANAGERS_PAGE}
            element={
              <PrivateRoute roles={[ROLES.ADMIN]}>
                <ManagersPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN.QUESTIONS_PAGE}
            element={
              <PrivateRoute roles={[ROLES.ADMIN]}>
                <QuestionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN.PROJECTS_PAGE}
            element={
              <PrivateRoute roles={[ROLES.ADMIN]}>
                <ProjectsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.EMPLOYEES_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <EmployeesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.CREATE_INTERVIEW_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <InterviewPage status="CREATE_INTERVIEW" />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.INTERVIEW_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <InterviewPage status="VIEW_INTERVIEW" />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.EDIT_INTERVIEW_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <InterviewPage status="EDIT_INTERVIEW" />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.CREATE_TEMPLATE_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <TemplatePage status="CREATE_TEMPLATE" />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.TEMPLATE_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <TemplatePage status="VIEW_TEMPLATE" />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.EDIT_TEMPLATE_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <TemplatePage status="EDIT_TEMPLATE" />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.INTERVIEWS_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <InterviewsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.PASSING_INTERVIEW_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <PassingInterviewPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.EDIT_FEEDBACK_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <PassingInterviewPage edit />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.FEEDBACK_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <FeedbackPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.ARCHIVE_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <ArchivePage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MANAGER.TEMPLATES_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER]}>
                <TemplatesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.PROJECT_INTERVIEWS_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER, ROLES.EMPLOYEE]}>
                <ProjectInterviewsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.CREATE_PROJECT_INTERVIEW_PAGE}
            element={
              <PrivateRoute roles={[ROLES.EMPLOYEE]}>
                <ProjectInterviewPage status="CREATE_PROJECT_INTERVIEW" />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.EDIT_PROJECT_INTERVIEW_PAGE}
            element={
              <PrivateRoute roles={[ROLES.EMPLOYEE, ROLES.MANAGER]}>
                <ProjectInterviewPage status="EDIT_PROJECT_INTERVIEW" />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.EMPLOYEE_INTERVIEWS_PAGE}
            element={
              <PrivateRoute roles={[ROLES.EMPLOYEE]}>
                <EmployeeInterviewsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.EMPLOYEE.EMPLOYEE_INTERVIEW_PAGE}
            element={
              <PrivateRoute roles={[ROLES.EMPLOYEE]}>
                <FeedbackPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.SETTINGS_PAGE}
            element={
              <PrivateRoute roles={[ROLES.MANAGER, ROLES.EMPLOYEE]}>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          progressStyle={{ background: TOASTER.PROGRESS_COLOR }}
        />
      </SessionProvider>
    </Suspense>
  );
};

export default App;
