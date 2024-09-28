import axios from 'axios';
import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;

export const load = async ({ params, locals }) => {
    let slug = params.slug
    
    const response = await fetch(`http://${secretOrigin}/api/v1/sets/${slug}`, {
        method: "GET",
        headers: {
            "Authorization": locals.session || ""
        }
    })
    let res1 = await response.json()
    console.log(res1.currency)

    if (response.ok) {
        return {
            set: res1
        }
    }
    else {
        return {
            set: null
        }
    }
}

export const actions = {
    updateSet: async ({ request, locals }) => {
        const formData = await request.formData();

        // await new Promise(resolve => {
        //     setTimeout(resolve, 2000);
        //   });

        const newSet = await axios({
            url: `http://${secretOrigin}/api/v1/sets/edit`,
            method: "PATCH",
            headers: {
                "Authorization": locals.session || "",
            },
            data: formData
        })

        return {
            status: newSet.status
        }
    },
}
