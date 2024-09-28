import axios from 'axios';

export async function PATCH({ request, locals }) {
    const data = await request.json();
    
    console.log("update: ", data)
    const response = await axios({
        url: `http://${process.env.SECRET_ORIGIN}/user/update`,
        method: "PATCH",
        headers: {
            "Authorization": locals.session || "",
        },
        data: data
    })

    return new Response(JSON.stringify(response.data), { status: response.status })
}
