import { redirect } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;

export const actions = {
    default: async ({request, cookies}) => {
        const data = await request.formData();

        const email = data.get("email");
        const password = data.get("password");

        if (!email || !password) {
            return {
                email,
                problem: "Missing email or password"
            };
        }


        try {
            let response = await fetch(`http://${secretOrigin}:3000/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            })

            if (response.ok) {
                let res1 = await response.json()

                cookies.set("session", res1.session, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "none",
                    secure: true,
                    maxAge: 60 * 60 * 24 * 60
                })

                redirect(302, "/");

            } else {
                return {
                    problem: await response.json()
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};
