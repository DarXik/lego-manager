import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        console.log(data);

        const email = data.get("email");
        const password = data.get("password");
        const username = data.get("username");

        if (!email || !password) {
            return {
                email,
                problem: "Missing email or password"
            };
        }


        try {
            let response = await fetch("http://localhost:3000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username
                })
            })

            if (response.ok) {
                let res1 = await response.json()
                // return redirect(302, "/login"); // nefunguje
                return {
                    success: true,
                }

            } else {
                return {
                    success: false,
                    problem: await response.text()
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
};
