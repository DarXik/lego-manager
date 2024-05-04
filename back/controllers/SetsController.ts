import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import prisma from "../config/prisma";

const get = async (req: Request, res: Response) => {

    // počáteční kontrla
    if (!req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }
    const verifiedUser = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    // všechny sety
    if (!req.params.id) {
        // console.log("sets for user: ", verifiedUser.user.username);

        try {
            const sets = await prisma.sets.findMany({ where: { usedBy: { some: { id: verifiedUser.user.id } } } })
            const attachment = await prisma.setAttachment.findMany({ where: { setId: { in: sets.map(set => set.id) }, addedById: verifiedUser.user.id } })

            console.log(attachment)

            if (!sets || sets.length == 0) {
                return res.status(404).send({ message: "sets not found" })
            }

            const setsSmaller = sets.map(set => {
                return {
                    id: set.id,
                    name: set.name,
                    setNumber: set.setNumber,
                    themeName: set.themeName,
                    addedOn: attachment.find(attachment => attachment.setId == set.id)?.addedOn || null,
                    yearBought: attachment.find(attachment => attachment.setId == set.id)?.yearBought || null,
                }
            })

            return res.status(200).send(setsSmaller)
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "sets could not be found" })
        }
    }
    // jeden specifický set
    else {
        // console.log("looking for set: ", req.params.id);

        try {
            const set = await prisma.sets.findUnique({ where: { id: req.params.id, usedBy: { some: { id: verifiedUser.user.id } } } })
            const attachment = await prisma.setAttachment.findFirst({ where: { setId: set?.id, addedById: verifiedUser.user.id } })
            const myInstructions = await prisma.instructions.findMany({
                where: {
                    setId: set?.id,
                    addedById: verifiedUser.user.id,
                    set: { usedBy: { some: { id: verifiedUser.user.id } } }
                }
            })
            const allInstructions = await prisma.instructions.findMany({
                where: {
                    setId: set?.id,
                    addedById: { not: verifiedUser.user.id },
                    set: { usedBy: { some: { id: verifiedUser.user.id } } }
                }
            })
            console.log(myInstructions)
            console.log(allInstructions)

            if (!set || !attachment) {
                return res.status(404).send({ message: "set not found" })
            }

            if (attachment && set) {
                const { id, addedById, ...rest } = attachment

                return res.status(200).send({ ...set, ...rest, attachmentId: id, attachmentAddedById: addedById, allInstructions: allInstructions, myInstructions: myInstructions })
            }
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "set could not be found" })
        }
    }
}

export default { get }