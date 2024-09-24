import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;

export async function DELETE({ request, res, locals }: { request: Request, res: Response, locals: any }) {
    const data = await request.json();
    console.log("delete: ", data)

    const response = await fetch(`http://${secretOrigin}:3000/user/sessions/${data.id}`, {
        method: "DELETE",
        headers: new Headers({
            "Authorization": locals.session || ""
        })
    })

    return new Response(JSON.stringify(await response.json()), { status: response.status });

}