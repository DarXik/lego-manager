import { Request, Response } from "express"
import { verifyUser } from "../../services/userAuthentication";
import prisma from "../../config/prisma";

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

export default { patch };