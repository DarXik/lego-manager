export async function PATCH({ request, locals, cookies }) {
    // const body = await request.json();


    if (locals.session) {
        const response = await fetch(`http://${process.env.SECRET_ORIGIN}/user/logout`, {
            method: "GET",
            headers: new Headers({
                "Authorization": locals.session || ""
            })
        })

        if (response) {
            cookies.delete("session", { path: "/" });

            return new Response(JSON.stringify(await response.json()), { status: 200 })
        }

    }
    else {
        return new Response(JSON.stringify({ message: "not logged in" }), { status: 200 })
    }
    return new Response(JSON.stringify({ message: "not logged in" }), { status: 500 })
}
