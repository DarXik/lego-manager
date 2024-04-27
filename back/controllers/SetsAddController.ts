import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import prisma from "../config/prisma";
import uniqid from "uniqid";
import { v4 as uuidv4 } from 'uuid'
import multer from "multer";
const upload = multer({ dest: "uploads/" })
import path from "path"
import fs from 'fs'

const post = async (req: Request, res: Response) => {
    if (!req.body || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }

    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())

    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }

    const set: any = await req.body
    console.log(set)
    let newImageFilename;
    let newPDFFilename;

    if (req.files || req.file) {
        console.log(req.files)

        try {
            const files: any = req.files || req.file

            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP', '.svg', '.SVG', '.pdf', '.PDF']

            for (const key in files) {

                const ext = path.extname(files[key].originalname).toLowerCase()
                if (!allowedExtensions.includes(ext)) {

                    console.log("extension not allowed")
                    return res.status(500).send({ message: "extension not allowed" })
                }

                if (ext == ".pdf" || ext == ".PDF" && files[key].mimetype == "application/pdf") {
                    try {
                        newPDFFilename = `${uniqid()}-${files[key].originalname.split(".")[0]}${ext}`;

                        const filePath = path.join(__dirname, `../../uploads/instructions/${newPDFFilename}`)
                        await fs.promises.writeFile(filePath, files[key].buffer)
                    }
                    catch (err) {
                        console.log(err)
                        return res.status(500).send({ message: "pdf could not be saved" })
                    }
                }
                else {
                    try {
                        newImageFilename = `${uniqid()}-${files[key].originalname.split(".")[0]}${ext}`;

                        const filePath = path.join(__dirname, `../../uploads/images/${newImageFilename}`)
                        await fs.promises.writeFile(filePath, files[key].buffer)
                    }
                    catch (err) {
                        console.log(err)
                        return res.status(500).send({ message: "image could not be saved" })
                    }
                }
            }
            // }



        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "image could not be saved" })
        }
    }


    try {
        let resThemeName: string = "Custom" // dodělat od usera
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

        const newSet = await prisma.sets.create({
            data: {
                id: uuidv4(),
                setNumber: parseInt(set.setNumber),
                name: set.name,
                description: set.description || null, // failuje pro čj
                partsAmount: parseInt(set.partsAmount),
                themeId: parseInt(set.themeId),
                themeName: resThemeName,
                yearReleased: parseInt(set.yearReleased) || null,
                bought: (set.isBought == "on" ? true : false) || null,
                yearBought: parseInt(set.yearBought) || null,
                price: parseInt(set.price) || null,
                imageThumbnail: newImageFilename || null,
                instructions: newPDFFilename || null,
                ownedBy: verifiedUser.user.id,
                addedOn: new Date()
            }
        })
        console.log("new set: ", newSet)

        try {
            if (newSet) {
                if (await prisma.users.update({
                    where: {
                        id: verifiedUser.user.id
                    },
                    data: {
                        sets: {
                            sets: [...verifiedUser.user.sets.sets, newSet.id]
                        }
                    }
                })) {
                    res.status(201).send({ message: "set added" })
                }
                else {
                    res.status(503).send({ message: "set could not be added 1" })
                }

            } else {
                res.status(503).send({ message: "set could not be added 2" })
            }

        } catch (err) {
            console.log(err);

            res.status(503).send({ message: "set could not be added 3" })
        }

    } catch (e) {
        console.log(e)

        res.status(503).send({ message: "set could not be added 4" })
    }
}

export default { post }