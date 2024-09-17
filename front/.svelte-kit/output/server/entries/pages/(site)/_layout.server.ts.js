import { r as redirect } from "../../../chunks/index2.js";
import { p as private_env } from "../../../chunks/shared-server.js";
const secretOrigin = private_env.SECRET_ORIGIN;
const load = async ({ locals, data, cookies }) => {
  if (!locals.session || !locals.user) {
    cookies.delete("session", { path: "/" });
    redirect(302, "/login");
  } else {
    const response = await fetch(`http://${secretOrigin}:3000/user/preferences`, {
      method: "GET",
      headers: {
        "Authorization": locals.session || ""
      }
    });
    const res = await response.json();
    return {
      ...data,
      sessionId: locals.session,
      username: res.username,
      currency: res.preferredCurrency,
      language: res.preferredLanguage
    };
  }
};
export {
  load
};
