import axios from 'axios';

export const load = async ({ params, locals }) => {
    let slug = params.slug
    console.log(slug)
    const response = await fetch(`http://localhost:3000/api/v1/sets/${slug}`, {
        method: "GET",
        headers: {
            "Authorization": locals.session || ""
        }
    })
    let res1 = await response.json()
    console.log(res1)

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

        if (!formData.get("descriptionEdit") || !formData.get("yearBoughtEdit") || !formData.get("priceEdit") ) {
            return {
                problem: "Missing required fields"
            }
        }

        console.log(formData)

        const newSet = await axios({
            url: "http://localhost:3000/api/v1/sets/edit",
            method: "PATCH",
            headers: {
                "Authorization": locals.session || "",
                // 'Content-Type': `multipart/form-data`,
            },
            timeout: 5000,
            data: formData
        })

        console.log(newSet)
    },
}