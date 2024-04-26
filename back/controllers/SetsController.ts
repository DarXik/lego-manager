import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import prisma from "../config/prisma";

const get = async (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())

    console.log("sets for user: ", verifiedUser.user.username);

    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    try {
        const sets = await prisma.sets.findMany({ where: { ownedBy: verifiedUser.user.id } })

        if (!sets || sets.length == 0) {
            return res.status(404).send({ message: "sets not found" })
        }

        return res.status(200).send(sets)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "sets could not be found" })
    }
}

export default { get }