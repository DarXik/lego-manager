import axios from 'axios';

export async function PATCH({ request, locals }) {
    const data = await request.json();
    console.log(data)

    const response = await axios({
        url: "http://localhost:3000/user/update",
        method: "PATCH",
        headers: {
            "Authorization": locals.session || "",
        },
        timeout: 5000,
        data: data
    })

    return new Response(JSON.stringify(await response.data), { status: response.status })
}