import axios from "axios";
import { p as private_env } from "../../../../chunks/shared-server.js";
const secretOrigin = private_env.SECRET_ORIGIN;
const actions = {
  addSet: async ({ request, locals }) => {
    const formData = await request.formData();
    if (!formData.get("name") || !formData.get("partsAmount") || !formData.get("setNumber") || !formData.get("themeName")) {
      return {
        problem: "Missing required fields"
      };
    }
    console.log("form data: ", formData);
    try {
      const response = await axios({
        baseURL: `http://${secretOrigin}:3000/api/v1/sets/add`,
        method: "POST",
        data: formData,
        headers: {
          "Authorization": locals.session || "",
          "Content-Type": `multipart/form-data`
        },
        timeout: 15e3
      });
      console.log(response.data);
      return {
        success: true,
        message: response?.data?.message
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message || error?.message || "Something went wrong",
        status: error?.response?.status || 500
      };
    }
  },
  searchLegoSet: async ({ request, locals }) => {
    const data = await request.formData();
    const searchQuery = data.get("searchQuery");
    console.log("search query: ", searchQuery);
    let response = await fetch(`http://${secretOrigin}:3000/api/v1/sets/search/${searchQuery}`, {
      method: "GET",
      headers: new Headers({
        "Authorization": locals.session || ""
      })
    });
    let res = await response.json();
    console.log(res);
    if (response.ok) {
      return {
        setsFound: res
      };
    } else {
      return {
        setsFailed: res.message
      };
    }
  }
};
export {
  actions
};
