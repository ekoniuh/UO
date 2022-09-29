export const ROUTES = {
  ROOT: "/",
  LOGIN_PAGE: "/login",
  REDIRECT_PAGE: "/redirect",
  SETTINGS_PAGE: "/settings",
  PROJECT_INTERVIEWS_PAGE: "/project-interviews",
  PROJECT_INTERVIEW_PAGE: "/project-interview/:id",
  EDIT_PROJECT_INTERVIEW_PAGE: "/project-interview/:id/edit",
  ADMINISTRATOR: {
    MANAGERS_PAGE: "/managers",
    QUESTIONS_PAGE: "/questions",
    PROJECTS_PAGE: "/projects",
  },
  MANAGER: {
    EMPLOYEES_PAGE: "/employees",
    INTERVIEWS_PAGE: "/interviews",
    CREATE_INTERVIEW_PAGE: "/interview/create",
    INTERVIEW_PAGE: "/interview/:id", //view interview page
    EDIT_INTERVIEW_PAGE: "/interview/:id/edit",
    PASSING_INTERVIEW_PAGE: "/interview/passing/:id",
    ARCHIVE_PAGE: "/archive",
    FEEDBACK_PAGE: "/feedback/:id",
    EDIT_FEEDBACK_PAGE: "/feedback/:id/edit",
    TEMPLATES_PAGE: "/templates",
    CREATE_TEMPLATE_PAGE: "/template/create",
    TEMPLATE_PAGE: "/template/:templateId",
    EDIT_TEMPLATE_PAGE: "/template/:templateId/edit",
  },
  EMPLOYEE: {
    CREATE_PROJECT_INTERVIEW_PAGE: "/project-interview/create",
    EMPLOYEE_INTERVIEWS_PAGE: "/results",
    EMPLOYEE_INTERVIEW_PAGE: "/result/:employeeFeedbackId",
  },
};
