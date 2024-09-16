import { env } from '$env/dynamic/private';
const secretOrigin = env.SECRET_ORIGIN;
import axios from 'axios';

export const actions = {
    default: async ({ request } : {request : Request}) => {
        const data = await request.formData();
    
        const password = data.get("password");
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
