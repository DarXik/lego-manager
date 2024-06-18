// @ts-nocheck
import type { Actions } from './$types';
import axios from 'axios';
import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;

export const actions = {
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
                    'Content-Type': `multipart/form-data`,
                },
                timeout: 15000
            });
            console.log(response);
            return response.data;
            
        } catch (error) {
            console.log(error);
            return error;
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
        console.log(res)

        if (response.ok) {
            return {
                setsFound: res
            }
        }
        else {
            return {
                setsFailed: res.message
            }
        }

    }
} satisfies Actions;
;null as any as Actions;