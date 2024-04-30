import { Request, Response } from "express"
import { createToken } from "../services/userAuthentication"
import prisma from "../config/prisma"
import { verifyPassword } from "../services/userHash"
import { v4 as uuidv4 } from 'uuid'

const post = async (req: Request, res: Response) => {
    console.log(req.body);

    if ((!req.body.email && !req.body.username) || !req.body.password) {
        return res.status(400).send({ message: "something is missing" })
    }

    try {
        const user = await prisma.users.findUnique({ where: { email: req.body.email } } || { where: { username: req.body.email } })
        console.log("logging in: ", user)

        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        if (!await verifyPassword(req.body.password, user.password)) {
            return res.status(401).send({ message: "wrong password" })
        }

        const userSession: string = createToken(user.id.toString()).toString()

        try {

            await prisma.users.update({
                where: { id: user.id },
                data: {
                    sessions: {
                        create: [{ token: userSession }]
                    }
                }
            })

            console.log("user logged in")

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