const handle = async ({ event, resolve }) => {
  event.locals.session = event.cookies.get("session")?.toString() || "";
  event.locals.user = true;
  return resolve(event);
};
export {
  handle
};
