import type { Handle } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.session = event.cookies.get('session')?.toString() || null

    if (!event.locals.session) {
        event.locals.user = false
        return resolve(event)
    }

    try {
        const user = await prisma.users.findFirst({
            where: {
                sessions: {
                    some: {
                        token: event.locals.session
                    }
                }
            }
        })

        if (user) {
            event.locals.user = true
        } else {
            event.locals.user = false
        }

        return resolve(event)
    }
    catch (e) {
        event.locals.user = false
        return resolve(event)
    }
};