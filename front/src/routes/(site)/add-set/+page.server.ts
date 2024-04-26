import type { Actions } from './$types';
import axios from 'axios';

export const actions = {
    addSet: async ({ request, cookies, locals }) => {
        const formData = await request.formData();

        console.log("form data: ", formData)

        const newSet = await axios({
            url: "http://localhost:3000/api/v1/sets/add",
            method: "POST",
            headers: {
                "Authorization": locals.session?.toString() || "",
                'Content-Type': `multipart/form-data`,
            },
            timeout: 5000,
            data: formData
        })

        console.log("new set: ", newSet.data)

        if (newSet.status == 201) {
            return {
                success: true,
                message: newSet.data
            }
        }
        else {
            return {
                success: false,
                message: newSet.data
            }
        }

    }
} satisfies Actions;