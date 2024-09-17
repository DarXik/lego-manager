import axios from "axios";
import { p as private_env } from "../../../../../chunks/shared-server.js";
const secretOrigin = private_env.SECRET_ORIGIN;
const load = async ({ params, locals }) => {
  let slug = params.slug;
  console.log(slug);
  const response = await fetch(`http://${secretOrigin}:3000/api/v1/sets/${slug}`, {
    method: "GET",
    headers: {
      "Authorization": locals.session || ""
    }
  });
  let res1 = await response.json();
  console.log(res1.currency);
  if (response.ok) {
    return {
      set: res1
    };
  } else {
    return {
      set: null
    };
  }
};
const actions = {
  updateSet: async ({ request, locals }) => {
    const formData = await request.formData();
    const newSet = await axios({
      url: `http://${secretOrigin}:3000/api/v1/sets/edit`,
      method: "PATCH",
      headers: {
        "Authorization": locals.session || ""
      },
      data: formData
    });
    return {
      status: newSet.status
    };
  }
};
export {
  actions,
  load
};
