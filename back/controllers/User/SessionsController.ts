import { Request, Response } from 'express'
import { verifyUser } from "../../services/userAuthentication";
import prisma from "../../config/prisma";


const get = async (req: Request, res: Response) => {
    if (!req.headers.authorization || !req.body) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    try {
        const sessions = await prisma.sessions.findMany({
            where: {
                userId: verifiedUser.user.id
            }
        })

        if (!sessions) {
            return res.status(404).send({ message: "no sessions found" })
        }

        const sessionData = sessions.map((session: any) => {
            return {
                id: session.id,
                browser: session.browser,
                location: session.location,
                os: session.os,
                addedOn: session.addedOn
            }
        })

        return res.status(200).send(sessionData)
    }
    catch (err) {
        console.log(err)
        return res.status(503).send({ message: "could not get sessions" })
    }
}

const deleteSession = async (req: Request, res: Response) => {
    if (!req.headers.authorization || !req.params.sessionId) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    console.log("session to delete: ", verifiedUser.token)
    try {
        await prisma.users.update({
            where: { id: verifiedUser.user.id },
            data: {
                sessions: { delete: { id: req.params.sessionId } }
            }
        })

        return res.status(200).send({ message: "session deleted" })
    }
    catch (err) {
        console.log(err)
        return res.status(503).send({ message: "could not delete session" })
    }
}

export default { get, deleteSession }