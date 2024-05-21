export const DELETE = async ({ request, locals }) => {
    const data = await request.json();

    console.log(data);

    const res = await fetch(
        "http://localhost:3000/api/v1/sets/edit",
        {
            method: "DELETE",
            headers: {
                Authorization: locals.session || "",
            },
            body: JSON.stringify({
                toDelete: "instruction",
                id: data.id,
            }),
        },
    );
    // neposílá data na backend, předělat backend jen na delte - :id -- zjistit??
    return new Response(JSON.stringify(await res.json()), { status: res.status });
}