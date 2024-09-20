import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;
import axios from 'axios';

export async function POST({ request, locals }) {
    const data = await request.json();

    console.log("update: ", data)
    const response = await axios({
        url: `http://${secretOrigin}:3000/api/v1/sets/favorite`,
        method: "PATCH",
        headers: {
            "Authorization": locals.session || "",
        },
        data: data
    })

    return new Response(JSON.stringify(response.data), { status: response.status })
}