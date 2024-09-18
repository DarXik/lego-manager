import { Request, Response } from "express"
import { verifyUser } from "../../services/userAuthentication";
import prisma from "../../config/prisma";

interface ReleaseDate {
    year: number,
    frequency: number
}

interface StatsObject {
    releaseDates: any[],
    purchaseDates: any[],
    partsAmountTotal: number,
    setsUsedAmount: number,
    setsUsedByAmount: number,
    setsContributedAmount: number,
    totalPrice: number
}

const get = async (req: Request, res: Response) => {

    // počáteční kontrola
    if (!req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }
    const verifiedUser = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    console.log("get all stats for user " + verifiedUser.user.username);

    try {
        const sets: any = await prisma.sets.findMany({ where: { usedBy: { some: { id: verifiedUser.user.id } } }, include: { usedBy: true } })

        if (!sets || sets.length == 0) {
            return res.status(404).send({ message: "sets not found" })
        }

        const attachments = await prisma.setAttachment.findMany({ where: { setId: { in: sets.map((set: any) => { return set.id }) }, addedById: verifiedUser.user.id } })

        const releaseDatesArray: { [key: number]: ReleaseDate } = {};
        const purchaseDatesArray: { [key: number]: ReleaseDate } = {};
        const usedByArray: string[] = [];

        const statsObject: StatsObject = {
            releaseDates: [{}],
            purchaseDates: [{}],
            partsAmountTotal: 0,
            setsUsedAmount: 0,
            setsUsedByAmount: 0,
            setsContributedAmount: 0,
            totalPrice: 0,
        }

        sets.forEach((set: any) => {
            statsObject.setsUsedAmount++;
            statsObject.partsAmountTotal += set.partsAmount;
            if (set.usedBy.length > 1 && set.addedById == verifiedUser.user.id) {

                set.usedBy.forEach((user: any) => {
                    if (user.id != verifiedUser.user.id) {
                        if (!usedByArray.includes(user.id)) {
                            usedByArray.push(user.id);
                        }
                    }
                })
            }            

            if (set.addedById == verifiedUser.user.id) statsObject.setsContributedAmount++;

            let setAttachment = attachments.find((attachment: any) => attachment.setId == set.id);

            if (setAttachment) {
                statsObject.totalPrice += setAttachment?.price ? setAttachment.price : 0;

                if (setAttachment.yearBought) {
                    if (purchaseDatesArray[setAttachment.yearBought]) {
                        purchaseDatesArray[setAttachment.yearBought].frequency++;
                    }
                    else {
                        purchaseDatesArray[setAttachment.yearBought] = {
                            year: setAttachment.yearBought,
                            frequency: 1
                        };
                    }
                }
            }

            if (set.yearReleased) {
                if (releaseDatesArray[set.yearReleased]) {
                    releaseDatesArray[set.yearReleased].frequency++;
                }
                else {
                    releaseDatesArray[set.yearReleased] = {
                        year: set.yearReleased,
                        frequency: 1
                    };
                }
            }
        })

        statsObject.setsUsedByAmount = usedByArray.length;
        statsObject.releaseDates = Object.values(releaseDatesArray);
        statsObject.purchaseDates = Object.values(purchaseDatesArray);

        return res.status(200).send(statsObject)

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "sets could not be found" })
    }
}

export default { get };