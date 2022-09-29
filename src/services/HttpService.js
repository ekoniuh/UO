import { store } from "../";

export class HttpService {
  constructor() {
    this.url = "";
    this.headers = "";
  }

  init(url, headers = {}) {
    this.url = url;
    this.headers = headers;
  }

  async sendRequest(path, method = "GET", body, headers) {
    const bodyRequest = body instanceof FormData ? body : body ? JSON.stringify(body) : undefined;
    // return { data: [], status: "success" };
    // return { status: "empty" };
    // return { status: "error" };
    // return { status: "badRequest" };
    // console.log("bodyRequest", bodyRequest);
    // console.log("headers", headers);
    // return { status: "update" };
    try {
      const response = await fetch(this.url + path, {
        method,
        body: bodyRequest,
        headers: { ...headers, Authorization: "Bearer " + localStorage.getItem("token") },
      });
      // return { data: [], status: "success" };
      // return { status: "empty" };
      // return { status: "error" };
      // return { status: "update" };
      if (response.status === 401 || response.status === 403) {
        store.logout();
        return;
      }

      if (response.status === 400) {
        return { status: "badRequest" };
      }

      if (response.status === 500) {
        return { status: "error" };
      }
      // debugger;
      if (response.ok) {
        let data = null;

        if (method === "POST" || method === "PUT" || method === "DELETE") {
          try {
            data = await response?.json();

            return { status: "update", data };
          } catch (error) {
            return { status: "update" };
          }
        }

        try {
          data = await response.json();
          if (Array.isArray(data) && !data.length > 0) {
            return { status: "empty" };
          }

          if (Object.keys(data).length === 0 && data.constructor === Object) {
            return { status: "empty" };
          }

          return { data, status: "success" };
        } catch (error) {
          return { status: "empty" };
        }
      } else {
        return { status: "error" };
      }
    } catch (error) {
      console.log("error :>> ", error);
      return { status: "error" };
    }
  }

  async checkStatusResponse(response) {
    if (response.status === 401 || response.status === 403) {
      store.logout();
      return;
    }

    if (response.status === 400) {
      return { status: "badRequest" };
    }

    if (response.status === 500) {
      return { status: "error" };
    }

    if (response.ok) {
      let data = null;

      try {
        data = await response.json();
        return { data, status: "success" };
      } catch (error) {
        return { status: "empty" };
      }
    }
  }

  get(path) {
    return this.sendRequest("GET", path);
  }

  post(path, body) {
    return this.sendRequest("POST", path, body);
  }

  put(path, body) {
    return this.sendRequest("PUT", path, body);
  }

  delete() {}
}

export const httpService = new HttpService();
