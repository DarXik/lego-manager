import { Request, Response } from "express"
import { createToken } from "../services/userAuthentication"
import prisma from "../config/prisma"
import { verifyPassword } from "../services/userHash"

const post = async (req: Request, res: Response) => {
    console.log(req.body);

    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "something is missing" })
    }

    try {
        const user = await prisma.users.findUnique({ where: { email: req.body.email } } || { where: { username: req.body.email } })
        console.log(user)

        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        if (!await verifyPassword(req.body.password, user.password)) {
            return res.status(401).send({ message: "wrong password" })
        }

        const userSession: string = createToken(user.id.toString()).toString()
        console.log(userSession)

        try {

            await prisma.users.update({
                where: { id: user.id },
                data: {
                    sessions: {
                        sessions: [...user?.sessions?.sessions, userSession]
                    }
                }
            })

            res.status(200).send({
                session: userSession,
                username: user.username,
                email: user.email,

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