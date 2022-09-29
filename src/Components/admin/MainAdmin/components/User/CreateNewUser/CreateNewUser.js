
import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { API_CONFIG } from "../../../../../../constants";
import { getNotificationConfig } from "../../../../../../helpers";
import { httpService } from "../../../../../../services";
import { BoxControlButtons } from "./BoxControlButtons";
import { BoxFieldsWithData } from "./BoxFieldsWithData";
import {
  checkChar,
  checkLength,
  checkLower,
  checkNumber,
  checkUpper
} from "./helpers/checkPassWord";
import { RecommendationForPassword } from "./RecommendationForPassword";

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 655,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  textAlign: "center",
};

const INITIAL_DATA_USER = {
  name: "",
  pass: "",
  email: "",
};

export function CreateNewUser({ closeModal, showAlert, loadDataPage, installationId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyFields, setIsEmptyFields] = useState(true);
  const [createDataUser, setCreateDataUser] = useState(INITIAL_DATA_USER);
  const [showPassword, setShowPassword] = useState(false);
  const [helperTextEmail, setHelperTextEmail] = useState("Поле обязательно к заполнению");
  // const [isValidatePassword, setIsValidatePassword] = useState({
  //   lengthPass: false,
  //   isNumber: false,
  //   isUppercase: false,
  //   isLowercase: false,
  //   isSpecialCharacter: false,
  // });

  const sendDataNewUser = async () => {
    const { PATH, METHOD, HEADERS } = API_CONFIG.createUser(installationId);

    setIsLoading(true);
    const response = await httpService.sendRequest(PATH, METHOD, createDataUser, HEADERS);

    if (response.status !== "update") {
      showAlert(getNotificationConfig(response.status));
    } else {
      showAlert(getNotificationConfig("createUser", "создан"));
      setCreateDataUser(INITIAL_DATA_USER);
      closeModal("addUser");
      loadDataPage();
    }

    setIsLoading(false);
  };

  const saveDataUser = () => {
    if (isEmptyFields) return;
    sendDataNewUser();
  };

  useEffect(() => {
    const isDisableBtnSendData =
      !createDataUser.email ||
      !validateEmail(createDataUser["email"]) ||
      !finalCheckPassword(createDataUser);
    // !validatePassword(createDataUser["pass"]);
    setIsEmptyFields(isDisableBtnSendData);
    setHelperTextEmail(() => getHelperTextEmail());
    // setHelperTextPass(() => getHelperTextPass());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createDataUser]);

  const finalCheckPassword = ({ pass }) =>
    checkLower(pass) &&
    checkLength(pass) &&
    checkNumber(pass) &&
    checkUpper(pass) &&
    checkChar(pass);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return re.test(String(email).toLowerCase());
  };

  // const validatePassword = (pass) => {
  //   const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
  //   return strongRegex.test(String(pass));
  // };

  const getHelperTextEmail = () => {
    const text = !createDataUser.email
      ? "Поле обязательно к заполнению"
      : !validateEmail(createDataUser["email"])
      ? "Напишите корректную почту"
      : "";
    return text;
  };

  // const getHelperTextPass = () => {
  //   const text = !createDataUser.pass
  //     ? "Поле обязательно к заполнению"
  //     : !isValidatePassword(createDataUser["pass"])
  //     ? "Пароль должен содержать минимум 8 символов: 1 символ, 1 строчную и 1 заглавную букву, 1 число "
  //     : "";
  //   return text;
  // };

  const handleChangeDataUser = ({ target }) => {
    const { name, value } = target;
    setCreateDataUser((prev) => ({ ...prev, [name]: value }));
  };

  const resetFields = () => {
    setCreateDataUser(INITIAL_DATA_USER);
    closeModal("addUser");
  };

  // const errorEmail = () => !createDataUser.email || !validateEmail(createDataUser["email"]);
  // console.log('errorEmail', errorEmail)
  return (
    <Box sx={styleBox}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Регистрация пользователя
      </Typography>

      <BoxFieldsWithData
        dataUser={createDataUser}
        showPassword={showPassword}
        changeDataUser={handleChangeDataUser}
        clickShowPassword={handleClickShowPassword}
        helperTextEmail={helperTextEmail}
        errorEmail={!createDataUser.email || !validateEmail(createDataUser["email"])}
      />

      <RecommendationForPassword pass={createDataUser.pass} />

      <BoxControlButtons
        resetFields={resetFields}
        isLoading={isLoading}
        disabledBtn={isEmptyFields}
        sendDataUser={saveDataUser}
      />
    </Box>
  );
}
