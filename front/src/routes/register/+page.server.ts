import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;
import axios from 'axios';
import { passwordStrength } from 'check-password-strength'

export const actions = {
    default: async ({ request }: { request: Request }) => {
        const data = await request.formData();

        const password = data.get("password")?.toString() || "";
        const confirm_password = data.get("confirm_password");
        const username = data.get("username");

        if (!username || !password) {
            return {
                username,
                problem: "Missing username or password"
            };
        }

        if (confirm_password !== password) {
            return {
                username,
                problem: "Passwords do not match"
            };
        }

        if (passwordStrength(password).id < 3 && password.length < 8) {
            return {
                username,
                problem: "Password is too weak"
            }
        }

        console.log("registering");
        try {
            const response = await axios({
                baseURL: `http://${secretOrigin}:3000/user/register`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                data: JSON.stringify({
                    username: username,
                    password: password,
                })
            })

            return {
                status: response.status,
                message: await response.data.message
            }

        } catch (error) {
            console.error(error);
        }
    }
};
