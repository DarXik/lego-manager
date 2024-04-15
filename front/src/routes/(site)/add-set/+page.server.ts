import type { Actions } from './$types';

export const actions = {
    addSet: async ({ request, cookies, locals }) => {
        const data = await request.formData();

        console.log(data);
        

        const name = data.get("name");
        const description = data.get("description");
        const price = data.get("price");
        const setNumber = data.get("setNumber");
        const partsAmount = data.get("partsAmount");
        const themeId = data.get("themeId");
        const yearReleased = data.get("yearReleased");
        const yearBought = data.get("yearBought");
        const isBought = data.get("isBought");

        let newSet = await fetch("http://localhost:3000/api/v1/sets/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": locals.session?.toString() || ""
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                setNumber: setNumber,
                partsAmount: partsAmount,
                themeId: themeId,
                yearReleased: yearReleased,
                yearBought: yearBought,
                isBought: isBought
            })

        })

        console.log("newSet: ", await newSet.status)

    }
} satisfies Actions;