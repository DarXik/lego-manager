import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import prisma from "../config/prisma";
import path from "path"
import fs from 'fs/promises'

const deleteSet = async (req: Request, res: Response) => {
    // počáteční kontrola
    if (!req.params.id || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }
    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    let setId = req.params.id;
    console.log("set to delete: ", setId)

    try {
        await prisma.users.update({
            where: { id: verifiedUser.user.id },
            data: {
                usedSets: { disconnect: [{ id: setId }] },
            }
        })

        // let attachment = await prisma.setAttachment.findFirst({
        //     where: {
        //         setId: setId,
        //         addedById: verifiedUser.user.id
        //     }
        // })

        // await prisma.setAttachment.deleteMany({
        //     where: {
        //         setId: setId,
        //         addedById: verifiedUser.user.id
        //     }
        // })

        // if (attachment?.image) {
        //     try {
        //         await fs.unlink(path.join(__dirname, `../../uploads/images/${attachment?.image}`))
        //     }
        //     catch (err) {
        //         console.log(err)
        //         return res.status(500).send({ message: "image could not be deleted" })
        //     }
        // }


        let instructions = await prisma.instructions.findFirst({
            where: {
                setId: setId,
                addedById: verifiedUser.user.id
            }
        })

        await prisma.instructions.deleteMany({
            where: {
                setId: setId,
                addedById: verifiedUser.user.id
            }
        })

        if (instructions?.instructions) {
            try {

                let file = path.join(__dirname, `../../uploads/instructions/${instructions?.instructions}`)
                console.log("file do delete: ", file)
                await fs.unlink(file)
            }
            catch (err) {
                console.log(err)
                return res.status(500).send({ message: "pdf could not be deleted" })
            }
        }

        res.status(200).send({ message: "set deleted" })

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "set could not be deleted" })
    }
}

export default { deleteSet };