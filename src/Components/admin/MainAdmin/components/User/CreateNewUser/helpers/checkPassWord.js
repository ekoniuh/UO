export const checkLower = (pass) => new RegExp("^(?=.*[a-z])").test(String(pass));
export const checkLength = (pass) => new RegExp("^(?=.{8,})").test(String(pass));
export const checkNumber = (pass) => new RegExp("^(?=.*[0-9])").test(String(pass));
export const checkUpper = (pass) => new RegExp("^(?=.*[A-Z])").test(String(pass));
export const checkChar = (pass) => new RegExp("^(?=.*[!@#$%^&*])").test(String(pass));
