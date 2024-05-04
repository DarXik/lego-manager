import type { Actions } from './$types';
import axios from 'axios';

export const actions = {
    addSet: async ({ request, cookies, locals }) => {
        const formData = await request.formData();

        
        if (!formData.get("name") || !formData.get("partsAmount") || !formData.get("setNumber") || !formData.get("themeName")) {
            return {
                problem: "Missing required fields"
            }
        }
        
        console.log("form data: ", formData)
        const newSet = await axios({
            url: "http://localhost:3000/api/v1/sets/add",
            method: "POST",
            headers: {
                "Authorization": locals.session || "",
                'Content-Type': `multipart/form-data`,
            },
            timeout: 5000,
            data: formData
        })

        console.log("new set: ", newSet.data)

        if (newSet.status == 201) {
            return {
                newSetAdded: newSet.data,
            }
        }
        else {
            return {
                newSetFailed: newSet.data
            }
        }

    },
    searchLegoSet: async ({ request, locals }) => {
        const data = await request.formData();
        const searchQuery = data.get("searchQuery");

        console.log("search query: ", searchQuery)

        let response = await fetch(`http://localhost:3000/api/v1/sets/search/${searchQuery}`, {
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