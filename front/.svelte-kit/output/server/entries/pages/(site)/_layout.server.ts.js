import { r as redirect } from "../../../chunks/index.js";
const load = async ({ locals, data }) => {
  if (!locals.session && locals.user) {
    redirect(302, "/login");
  } else {
    return {
      ...data,
      sessionId: locals.session
    };
  }
};
export {
  load
};
