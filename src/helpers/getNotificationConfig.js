export function getNotificationConfig(status, name = "") {
  switch (status) {
    case "success":
      return {
        variant: "success",
        message: `Данные ${name} получены `,
      };
    case "empty":
      return {
        variant: "info",
        message: `Данных ${name} нет `,
      };
    case "badRequest":
      return {
        variant: "warning",
        message: `Некорректный запрос на сервер ${name}`,
      };
    case "error":
      return {
        variant: "error",
        message: `Произошла ошибка на сервере ${name}`,
      };
    case "update":
      return {
        variant: "success",
        message: `Данные успешно обновлены ${name}`,
      };
    case "create":
      return {
        variant: "success",
        message: `${name} успешно создано`,
      };
    case "clear":
      return {
        variant: "success",
        message: `Данные успешно удалены ${name}`,
      };
    case "deleteFile":
      return {
        variant: "success",
        message: `Файл успешно удалён`,
      };
    case "deleteStage":
      return {
        variant: "success",
        message: `Ступень успешно удалена`,
      };
    case "createUser":
    case "deleteUser":
    case "addUser":
      return {
        variant: "success",
        message: `Пользователь успешно ${name}`,
      };
    default:
      throw new Error();
  }
}
