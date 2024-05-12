import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/login/$types";

export const load = (async ({ locals, data }) => { 

    if (!locals.session && locals.user) {
        redirect(302, "/login");

    } else {

        return {
            ...data,
            sessionId: locals.session
        }
    }


}) satisfies PageServerLoad;