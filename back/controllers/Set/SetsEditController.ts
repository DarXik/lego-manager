import { Request, Response } from "express"
import { verifyUser } from "../../services/userAuthentication";
import prisma from "../../config/prisma";
import path from "path"
import fs from 'fs/promises'

const patch = async (req: Request, res: Response) => {
    // počáteční kontrola
    if (!req.body || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }
    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    console.log(await req.body)
    let set = await req.body

    console.log(set)

    try {
        const setAttachment = await prisma.setAttachment.findFirst({
            where: {
                set: { id: set?.setId },
                addedById: verifiedUser.user.id,
            }
        })

        const setAttachmentUpdate = await prisma.setAttachment.update({
            where: {
                id: setAttachment?.id,
                addedById: verifiedUser.user.id,
            },
            data: {
                description: set?.descriptionEdit,
                yearBought: parseInt(set?.yearBoughtEdit),
                price: parseInt(set?.priceEdit),
            }
        })

        if (setAttachmentUpdate) {
            res.status(200).send({ message: "set updated" })
        }
        else {
            res.status(503).send({ message: "set could not be updated" })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "set could not be updated" })
    }

}

const deleteMedia = async (req: Request, res: Response) => {
    // počáteční kontrola
    if (!req.body || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }
    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    console.log(await req.body)

    try {
        if (req.body.toDelete == "instruction") {
            let instruction = await prisma.instructions.findFirst({
                where: {
                    id: req.body.id,
                    AND: {
                        addedById: verifiedUser.user.id
                    }
                }
            })

            if (!instruction) {
                return res.status(404).send({ message: "instruction not found" })
            }

            let file = path.join(__dirname, `../../uploads/instructions/${instruction.instructions}`)
            console.log("file do delete: ", file)
            await fs.unlink(file)

            await prisma.instructions.delete({
                where: {
                    id: instruction.id,
                    AND: {
                        addedById: verifiedUser.user.id
                    }
                }
            })

            res.status(200).send({ message: "instruction deleted", id: instruction.id })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "intruction could not be deleted" })
    }
}

export default { patch, deleteMedia };