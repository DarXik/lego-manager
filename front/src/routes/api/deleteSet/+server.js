export async function POST({ request, locals }) {
    const body = await request.json();
    console.log(body)

    const response = await fetch(`http://localhost:3000/api/v1/sets/delete/${body.id}`, {
        method: "DELETE",
        headers: new Headers({
            "Authorization": locals.session || ""
        })
    })
    return new Response(JSON.stringify(await response.json()), { status: 200 })
}