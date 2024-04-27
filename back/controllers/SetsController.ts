import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import prisma from "../config/prisma";

const get = async (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    if (!req.params.id) {
        console.log("sets for user: ", verifiedUser.user.username);

        try {
            const sets = await prisma.sets.findMany({ where: { ownedBy: verifiedUser.user.id } })

            if (!sets || sets.length == 0) {
                return res.status(404).send({ message: "sets not found" })
            }

            const setsSmaller = sets.map(set => {
                return {
                    id: set.id,
                    name: set.name,
                    setNumber: set.setNumber,
                    addedOn: set.addedOn,
                    yearBought: set.yearBought,
                    bought: set.bought,
                    themeName: set.themeName,
                }
            })

            return res.status(200).send(setsSmaller)
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "sets could not be found" })
        }
    }
    else {
        console.log("looking for set: ", req.params.id);

        try {
            const set = await prisma.sets.findUnique({ where: { id: req.params.id, ownedBy: verifiedUser.user.id } })

            if (!set) {
                return res.status(404).send({ message: "set not found" })
            }

            return res.status(200).send(set)
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "set could not be found" })
        }
    }
}

export default { get }