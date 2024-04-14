import {redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "../../../.svelte-kit/types/src/routes/login/$types";

export const load = (async ({locals}) => {

    console.log(locals);

    if (!locals.session && locals.user) {
        redirect(302, "/login");

    } else {
        return {
            session: locals.session,
        }
    }

}) satisfies PageServerLoad;