import { Request, Response } from "express"
import { createToken } from "../services/userAuthentication"
import prisma from "../config/prisma"
import { verifyPassword } from "../services/userHash"

const post = async (req: Request, res: Response) => {
    console.log(req.body);

    if (!req.body.email || !req.body.password) {
        return res.send("email and password are required").status(400)
    }

    try {
        const user = await prisma.users.findUnique({ where: { email: req.body.email } } || { where: { username: req.body.email } })
        console.log(user)

        if (!user) {
            return res.send("user not found").status(404)
        }

        if (!await verifyPassword(req.body.password, user.password)) {
            return res.send("wrong password").status(401)
        }

        const userSession: string = createToken(user.id.toString()).toString()
        console.log(userSession)

        try {

            await prisma.users.update({
                where: { id: user.id },
                data: {
                    sessions: {
                        sessions: [...user.sessions.sessions, userSession]
                    }
                }
            })

            res.send({
                session: userSession,
                username: user.username,
                email: user.email,

            }).status(200)

        } catch (err) {

            console.log(err)
            res.send("could not be authenticated").status(503)
        }
    }
    catch (err) {
        console.log(err)
        res.send("could not be authenticated").status(503)
    }
}

export default { post }