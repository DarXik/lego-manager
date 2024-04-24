import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import { User } from "../models/User";
import prisma from "../config/prisma";
import { v4 as uuidv4 } from 'uuid'

const post = async (req: Request, res: Response) => {
    if (!req.body || !req.headers.authorization) {
        return res.send("something is missing").status(400)
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())

    console.log(verifiedUser);

    if (!verifiedUser.user || !verifiedUser.token) {
        return res.send("user not found").status(404)
    }

    const set: any = await req.body
    console.log("adding set: ", set)

    try {
        let resThemeName: string = "unknown" // dodělat od usera
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        };

        try {
            const responseTheme = await fetch(`https://rebrickable.com/api/v3/lego/themes/${set.themeId}`, {
                method: 'GET',
                headers: headers
            })

            if (responseTheme.ok) {
                resThemeName = (await responseTheme.json()).name
            }
            else {
                console.log("theme not found")
            }

        } catch (e) {
            console.log(e)
        }

        // const newSet = new Set({
        //     setNumber: parseInt(set.setNumber),
        //     name: set.name,
        //     description: set?.description,
        //     partsAmount: parseInt(set.partsAmount),
        //     themeId: parseInt(set.themeId),
        //     themeName: resThemeName,
        //     yearReleased: parseInt(set?.yearReleased),
        //     bought: set?.isBought,
        //     yearBought: parseInt(set.yearBought),
        //     price: parseInt(set?.price),
        //     imageThumbnailUrl: set?.imageThumbnailUrl,
        //     instructionsUrl: set?.instructionsUrl,
        //     ownedBy: verifiedUser.user
        // })

        const newSet = await prisma.sets.create({
            data: {
                id: uuidv4(),
                setNumber: parseInt(set.setNumber),
                name: set.name,
                description: set.description || null,
                partsAmount: parseInt(set.partsAmount),
                themeId: parseInt(set.themeId),
                themeName: resThemeName,
                yearReleased: parseInt(set.yearReleased) || null,
                bought: set.isBought || null,
                yearBought: parseInt(set.yearBought) || null,
                price: parseInt(set.price) || null,
                imageThumbnail: set.imageThumbnail || null,
                instructionsUrl: set.instructionsUrl || null,
                ownedBy: verifiedUser.user.id,
                addedOn: new Date()
            }
        })
        console.log("new set: ", newSet)
        try {
            if (await newSet) {
                if (await prisma.users.update({
                    where: {
                        id: verifiedUser.user.id
                    },
                    data: {
                        sets: {
                            sets: [...verifiedUser.user.sets.sets, newSet.id]
                        }
                    }
                })) 
                {
                    res.send("set added").status(201)
                }
                else {
                    res.send("set could not be added 1").status(503)
                }

            } else {
                res.send("set could not be added 2").status(503)
            }

        } catch (err) {
            console.log(err);

            res.send("set could not be added 3").status(503)
        }

    } catch (e) {
        console.log(e)

        res.send("set could not be added 4").status(503)
    }
}

export default { post }