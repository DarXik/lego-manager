import { Request, Response } from "express"
import { verifyUser } from "../../services/userAuthentication"
import prisma from "../../config/prisma"
import path from "path"
import fs from 'fs/promises'

const deleteAccount = async (req: Request, res: Response) => {

    if (!req.headers.authorization) {
        return res.status(400).send({ message: "Authorization header is missing" });
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }
    console.log("deleting account ", verifiedUser.user.username)
    // if (verifiedUser.user && verifiedUser.token) {
    // await fs.unlink(path.join(__dirname, `../../uploads/instructions/${element.instructions}`))
    // await fs.unlink(path.join(__dirname, `../../uploads/images/${attachment.image}`))

    try {
        await prisma.sessions.deleteMany({
            where: {
                userId: verifiedUser.user.id
            }
        })

        const sets: any[] = await prisma.sets.findMany({
            where: {
                AND: [{ usedBy: { some: { id: verifiedUser.user.id } } }, { addedById: verifiedUser.user.id }]
            },
            include: { usedBy: true }
        })

        if (!sets) {
            return res.status(404).send({ message: "sets not found" })
        }

        let hasUsedSets: boolean = false;

        for (const set of sets) {
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
            }
            else {
                hasUsedSets = true;
            }
        }

        if (!hasUsedSets) {
            await prisma.users.delete({
                where: { id: verifiedUser.user.id }
            })
        }
        else {
            await prisma.users.update({
                where: { id: verifiedUser.user.id },
                data: {
                    usedSets: { set: [] },
                    Instructions: { set: [] },
                    sessions: { set: [] },
                    deleted: true,
                    username: `deleted_${verifiedUser.user.username}_${Date.now()}`,
                    password: `deleted_${verifiedUser.user.username}_${Date.now()}`,
                }
            })
        }

        return res.status(200).send({ message: "account deleted" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "could not delete account" })
    }
}

export default { deleteAccount }