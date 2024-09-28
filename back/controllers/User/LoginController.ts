import { Request, Response } from "express"
import { createToken } from "../../services/userAuthentication"
import prisma from "../../config/prisma"
import { verifyPassword } from "../../services/userHash"
// import { v4 as uuidv4 } from 'uuid'

function getOS(agent: string) {
    if (agent.includes("Windows")) {
        return "Windows"
    }
    else if (agent.includes("Mac")) {
        return "Mac"
    }
    else if (agent.includes("Linux")) {
        return "Linux"
    }
    else if (agent.includes("Android")) {
        return "Android"
    }
    else if (agent.includes("iOS")) {
        return "iOS"
    }
    else {
        return "Unknown"
    }
}

function getBrowser(agent: string) {
    if (agent.includes("Chrome")) {
        return "Chrome"
    }
    else if (agent.includes("Firefox")) {
        return "Firefox"
    }
    else if (agent.includes("Safari")) {
        return "Safari"
    }
    else if (agent.includes("Edge")) {
        return "Edge"
    }
    else if (agent.includes("Opera")) {
        return "Opera"
    }
    else {
        return "Unknown"
    }
}

const post = async (req: Request, res: Response) => {
    console.log(req.body);

    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "something is missing" })
    }

    try {
        const user = await prisma.users.findFirst({ where: { username: req.body.email } })
        console.log("logging in: ", user)

        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        if (!await verifyPassword(req.body.password, user.password)) {
            return res.status(401).send({ message: "wrong password" })
        }

        if (user.deleted) {
            return res.status(401).send({ message: "user deleted" })
        }

        const userSession: string = createToken(user.id.toString()).toString()
        console.log(req.body.agent)
        const location: string = req.body?.coords || null;

        let browser: string = getBrowser(req.body?.agent) || null;
        const os: string = getOS(req.body?.agent) || null;

        console.log("browser: ", browser);
        console.log("os: ", os);

        try {
            await prisma.sessions.create(({
                data: {
                    token: userSession,
                    location: location,
                    browser: browser,
                    os: os,

                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            }))

            console.log("user logged in")

            res.status(200).send({
                session: userSession,
            })

        } catch (err) {

            console.log(err)
            res.status(503).send({ message: "could not be authenticated" })
        }

    }
    catch (err) {
        console.log(err)
        res.status(503).send({ message: "could not be authenticated" })
    }
}

export default { post }