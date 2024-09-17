import { config } from "dotenv";
config();
const load = async ({ fetch, locals, data }) => {
  const response = await fetch(`http://${process.env.SECRET_ORIGIN}:3000/api/v1/sets`, {
    method: "GET",
    headers: {
      "Authorization": locals.session || ""
    }
  });
  const res1 = await response.json();
  return {
    ...data,
    sets: res1
  };
};
export {
  load
};
