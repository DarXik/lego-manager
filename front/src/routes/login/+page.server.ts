import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;
import axios from 'axios';

export const actions = {
    default: async ({ request, cookies }: { request: Request, cookies: any }) => {
        const data = await request.formData();        

        const username = data.get("email");
        const password = data.get("password");

        if (!username || !password) {
            return {
                email: username,
                problem: "Missing username or password"
            };
        }

        console.log("logging in");
        try {            
            console.log("contacting server", `http://${secretOrigin}:3000/user/login`);

            const response = await axios({
                baseURL: `http://${secretOrigin}:3000/user/login`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                data: JSON.stringify({
                    email: username,
                    password: password,
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
