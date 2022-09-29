import { $api } from "../http/index";

export default class AuthService {
  static async login(user) {
    return $api.post("/users/login", user);
  }

  static async registration(email, password) {
    return $api.post("/registration", { email, password });
  }

  static async logout() {
    return $api.post("/logout");
  }
}
