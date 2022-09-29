// DDECODIFICA TOKEN
// const checkUser = () => {
  // let adminMode = false;
  // const role = getUserRole();
  // const userInfo = getUseInfo();
  // const token = tokenGetter();
  // let isLogged = false;
  // if (token) {
    // alert("Sessione scaduta!");
    // router.navigate(["login"]);
    // return;
  // }
  // if (token) {
  //   isLogged = true;
  //   if (role === "User") {
  //     adminMode = false;
  //   } else {
  //     adminMode = true;
  //   }
  // }
  // console.log("logged?: " + isLogged);
  // console.log("role: " + role);
  // console.log("username: " + username);
  // console.log("adminMode?: " + adminMode);
// };

const tokenGetter = () => {
  return localStorage.getItem("token");
};

export const getUserInfoFromToken = () => {
  const token = tokenGetter();

  if (!token) {
    return;
  }

  let tokenData = getParsedJwt(token);
  // let role =
  //   tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  return tokenData;
};

const getParsedJwt = (token) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (error) {
    console.log(error);
  }
};

// const getUserName = () => {
//   const token = tokenGetter();
//   if (!token) {
//     return;
//   }
//   let tokenData = getParsedJwt(token);
//   let username =
//     tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
//   return username;
// };
