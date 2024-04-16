import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.session = event.cookies.get('session')?.toString() || ""

    try {
        const user = await fetch("http://localhost:3000/user/check", {
            method: "GET",
            headers: {
                "Authorization": event.locals.session
            }
        })

        if (await user.ok) {
            event.locals.user = true

        } else {
            event.locals.user = false
        }
    } catch (e) {
        event.locals.user = false
        return resolve(event)
    }

    return resolve(event)

};