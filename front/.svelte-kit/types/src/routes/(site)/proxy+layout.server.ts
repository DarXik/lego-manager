// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad, PageServerLoadEvent } from './$types';
import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;

export const load = (async ({ locals, data, cookies }: PageServerLoadEvent) => {

    if (!locals.session || !locals.user) {
        cookies.delete("session", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });

        redirect(302, "/login");
    }
    else {

        const response = await fetch(`http://${secretOrigin}:3000/user/preferences`, {
            method: 'GET',
            headers: {
                "Authorization": locals.session || ""
            }
        })

        const res = await response.json()

        return {
            ...data,
            sessionId: locals.session,
            username: res.username,
            currency: res.preferredCurrency,
            language: res.preferredLanguage
        }
    }

});null as any as LayoutServerLoad;