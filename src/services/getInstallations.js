import { httpService } from "./HttpService";

export async function getInstallations(id) {
  try {
    const installations = await httpService.sendRequest("GET", `/installation/${id}/currentstate`);
    const isEmptyInstallations = !Object.keys(installations).length;

    if (isEmptyInstallations) {
      return { status: "empty" };
    }

    return { data: installations, status: "success" };
  } catch (error) {
    return { status: "error" };
  }
}
