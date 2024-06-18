import { Request, Response } from "express"
import { verifyUser } from "../../services/userAuthentication"
import prisma from "../../config/prisma"
import path from "path"
import fs from 'fs/promises'

const deleteAccount = async (req: Request, res: Response) => {

    if (!req.headers.authorization) {
        return res.status(400)
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization)

    if (verifiedUser.user && verifiedUser.token) {
        try {
            const attachments = await prisma.setAttachment.findMany({ where: { addedById: verifiedUser.user.id } })

            const instructions = await prisma.instructions.findMany({ where: { addedById: verifiedUser.user.id } })

            // všechny sety uživatele
            const sets = await prisma.sets.findMany({
                where: {
                    AND: [{ usedBy: { some: { id: verifiedUser.user.id } } }, { addedById: verifiedUser.user.id }]
                },
                include: { usedBy: true }
            })

            // odpojí a smaže instrukce, které měl pouze uživatel ve svých vlastních setech
            for (const set of sets) {
                if (set.usedBy.length == 1) {
                    await prisma.instructions.deleteMany({ where: { setId: set.id } })

                    //mazat i instrukce
                }
            }

            for (const attachment of attachments) {

                // smaže obrázek, pokud existuje
                if (attachment.image != null) {
                    console.log(attachment.image)
                    try {
                        await fs.unlink(path.join(__dirname, `../../../uploads/images/${attachment.image}`))
                    }
                    catch (err) {
                        console.log(err)
                        return res.status(500).send({ message: "could not find image when deleting" });
                    }
                }

                // smaže vždy daný set attachment
                await prisma.setAttachment.delete({ where: { id: attachment.id } })
            }

            for (const set of sets) {
                if (set.usedBy.length == 1) {
                    await prisma.sets.delete({ where: { id: set.id } })
                }
            }
            // smaže sessions uživatele
            await prisma.sessions.deleteMany({ where: { userId: verifiedUser.user.id } })
            await prisma.users.delete({ where: { id: verifiedUser.user.id } })

            return res.status(200).send({ message: "account deleted" })
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "could not delete account" })
        }
    }
    else {
        console.log("user not verified")
        return res.status(404)
    }

}

export default { deleteAccount }