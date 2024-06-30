import { Request, Response } from "express"
import { verifyUser } from "../../services/userAuthentication"
import prisma from "../../config/prisma"
import { hashPassword, verifyPassword } from "../../services/userHash"

const patch = async (req: Request, res: Response) => {
    if (!req.headers.authorization || !req.body) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    if (req.body.currency) {
        try {
            const currencies: any = {
                0: "czk",
                1: "eur",
                2: "usd",
                3: "gbp"
            }

            await prisma.users.update({
                where: {
                    id: verifiedUser.user.id
                },
                data: {
                    preferredCurrency: parseInt(req.body.currency)
                }
            })

            const attachments = await prisma.setAttachment.findMany({
                where: {
                    addedById: verifiedUser.user.id
                }
            })

            for (const attachment of attachments) {
                console.log("requested currency ", req.body.currency)
                console.log("current currency ", attachment.currency)

                if (attachment.price && attachment.currency) {
                    let newPrice: any;

                    try {
                        // nefungují historické ceny
                        newPrice = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencies[attachment.currency]}.min.json`)
                        newPrice = await newPrice.json()
                    }
                    catch (err) {
                        console.log(err)

                        try {
                            newPrice = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currencies[attachment.currency]}.min.json`)
                        }
                        catch (err) {
                            console.log(err)
                            return res.status(500).send({ message: "currency conversion failed" })
                        }
                    }

                    const result: number = Math.floor(attachment.price * (newPrice[currencies[attachment.currency]][currencies[req.body.currency]]));

                    console.log(`currency conversion from ${attachment.price} ${currencies[attachment.currency]} to ${currencies[parseInt(req.body.currency)]} resulted in ${result} ${currencies[parseInt(req.body.currency)]}`)

                    await prisma.setAttachment.update({
                        where: {
                            
                            id: attachment.id
                        },
                        data: {
                            price: result,
                            currency: parseInt(req.body.currency)
                        }
                    })
                }
                else if (attachment.currency) {

                    console.log("updating currency only")
                    await prisma.setAttachment.update({
                        where: {
                            id: attachment.id
                        },
                        data: {
                            currency: parseInt(req.body.currency)
                        }
                    })
                }
            }

            console.log("new currency after sets ", req.body.currency)
            return res.status(200).send({ message: "preferred currency updated" })
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "preferred currency could not be updated" })
        }
    }
    if (req.body.language) {
        try {

            await prisma.users.update({
                where: {
                    id: verifiedUser.user.id,
                },
                data: {
                    preferredLanguage: parseInt(req.body.language)
                }
            })

            return res.status(200).send({ message: "preferred language updated" })

        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "preferred language could not be updated" })
        }
    }
    if (req.body.newPassword && req.body.newPasswordRepeat && req.body.currentPassword) {
        try {
            if (req.body.newPassword !== req.body.newPasswordRepeat) {
                return res.status(400).send({ message: "passwords do not match" })
            }

            if (!await verifyPassword(req.body.currentPassword, verifiedUser.user.password)) {
                return res.status(400).send({ message: "current password is incorrect" })
            }

            await prisma.users.update({
                where: {
                    id: verifiedUser.user.id
                },
                data: {
                    password: await hashPassword(req.body.newPassword)
                }
            })

            return res.status(200).send({ message: "password updated" })

        }

        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "password could not be updated" })
        }

    }

}
export default { patch }