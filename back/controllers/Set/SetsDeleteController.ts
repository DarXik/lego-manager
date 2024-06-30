import { Request, Response } from "express"
import { verifyUser } from "../../services/userAuthentication";
import prisma from "../../config/prisma";
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
    console.log("set to delete: ", req.params.id)

    try {
        const set: any = await prisma.sets.findFirst({
            where: {
                AND: [{ usedBy: { some: { id: verifiedUser.user.id } } }, { addedById: verifiedUser.user.id }, { id: req.params.id }]
            },
            include: { usedBy: true }
        })

        if (!set) {
            return res.status(404).send({ message: "set not found" })
        }

        console.log(set.usedBy.length)
        console.log(set.addedById)
        console.log(set.usedBy[0].id)

        if (set.usedBy.length == 1 && set.addedById == verifiedUser.user.id && set.usedBy[0].id == verifiedUser.user.id) {

            await prisma.setAttachment.deleteMany({
                where: {
                    setId: set.id
                }
            })

            await prisma.instructions.deleteMany({
                where: {
                    setId: set.id
                }
            })

            await prisma.users.update({
                where: { id: verifiedUser.user.id },
                data: {
                    usedSets: { disconnect: [{ id: set.id }] },
                }
            })

            await prisma.sets.delete({
                where: { id: set.id }
            })

            console.log(`set ${set.name} also deleted completely`);
        }
        else {

            await prisma.users.update({
                where: { id: verifiedUser.user.id },
                data: {
                    usedSets: { disconnect: [{ id: set.id }] },
                }
            })

            await prisma.sets.update({
                where: { id: set.id },
                data: {
                    usedBy: { disconnect: [{ id: verifiedUser.user.id }] },
                }
            })

            console.log(`set ${set.name} disconnected`);
        }

        // ještě mazat instrukce a obrázky, plus attachmenty

        res.status(200).send({ message: "set deleted" })

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "set could not be deleted" })
    }
}

export default { deleteSet };