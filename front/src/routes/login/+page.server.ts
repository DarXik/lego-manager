import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;
import axios from 'axios';
import type { Cookies } from '@sveltejs/kit';

;

export const actions = {
    default: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
        const data = await request.formData();

        const username = data.get("email");
        const password = data.get("password");
        const coords = data.get("coords");
        const agent = request.headers?.get("user-agent");

        if (!username || !password) {
            return {
                email: username,
                problem: "Missing username or password"
            };
        }

        console.log("logging in");
        try {

            const response = await axios({
                baseURL: `http://${secretOrigin}/user/login`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                data: JSON.stringify({
                    email: username,
                    password: password,
                    coords: coords,
                    agent: agent
                })
            })


            let res1 = await response.data;

            if (response.status === 200) {
                cookies.set("session", res1.session, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "none",
                    secure: true,
                    maxAge: 60 * 60 * 24 * 60,
                })

                return {
                    success: true
                };

            } else {
                return {
                    succuess: false,
                    problem: await res1.data
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};
