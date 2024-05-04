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

    // počáteční kontrola
    if (!req.body || !req.headers.authorization) {
        return res.status(400).send({ message: "something is missing" })
    }
    const verifiedUser: any = await verifyUser(req.headers.authorization.toString())
    if (!verifiedUser.user || !verifiedUser.token) {
        return res.status(404).send({ message: "user not found" })
    }


    const userSet: any = await req.body
    console.log(userSet)
    let newImageFilename;
    let newPDFFilenames: string[] = [];

    // pokud nahrál image/manual
    if (req.files || req.file) {
        console.log(req.files)

        // kontrola a uložení souboru
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
                        const filename = `${uniqid()}-${files[key].originalname.split(".")[0]}${ext}`
                        newPDFFilenames.push(filename);

                        const filePath = path.join(__dirname, `../../uploads/instructions/${filename}`)
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

        // let newThemeName;
        // let newThemeId;

        // if (userSet.themeId && !userSet.themeName) {
        //     try {
        //         const themeName = await fetch(`https://rebrickable.com/api/v3/lego/themes/${userSet.themeId}`, {
        //             method: 'GET',
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        //             }
        //         })

        //         if (themeName.ok) {
        //             newThemeName = (await themeName.json()).name
        //             newThemeId = userSet.themeId
        //         }
        //         else {
        //             console.log("theme not found")
        //             newThemeName = ""
        //             newThemeId = userSet.themeId
        //         }
        //     }
        //     catch (err) {
        //         console.log(err)
        //         newThemeName = ""
        //         newThemeId = userSet.themeId
        //     }
        // }
        // else if (!userSet.themeId && userSet.themeName) {
        //     const themeId = await fetch('https://rebrickable.com/api/v3/lego/themes/?page=1&page_size=1000', {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Authorization': 'key fea25735873965685e52dfba8ad25aa8'
        //         }
        //     })

        //     if (themeId.ok) {
        //         newThemeId = (await themeId.json()).results.find((theme: any) => theme.name == userSet.themeName).id ? (await themeId.json()).results.find((theme: any) => theme.name == userSet.themeName).id : 1000
        //         newThemeName = userSet.themeName
        //     }
        // }
        // else{
        //     newThemeName = ""
        //     newThemeId = 1000
        // }

        // uložení a vytvoření setu
        let set: any = await prisma.sets.findUnique({ where: { setNumber: userSet.setNumber } })

        if (!set) {

            try {
                let newSet = await prisma.sets.create({
                    data: {
                        setNumber: userSet.setNumber,
                        name: userSet.name,
                        yearReleased: parseInt(userSet.yearReleased),
                        partsAmount: parseInt(userSet.partsAmount),
                        // themeId: parseInt(userSet.themeId),
                        themeName: userSet.themeName,
                        addedBy: { connect: { id: verifiedUser.user.id } },
                        usedBy: { connect: { id: verifiedUser.user.id } },
                    }
                })

                let newAttachment = await prisma.setAttachment.create({
                    data: {
                        description: userSet?.description || null,
                        yearBought: parseInt(userSet?.yearBought) || null,
                        price: parseInt(userSet?.price) || null,
                        image: newImageFilename || null,
                        addedBy: { connect: { id: verifiedUser.user.id } },
                        set: { connect: { id: newSet.id } }
                    }

                })

                let newInstructions = await prisma.instructions.createMany({
                    data: newPDFFilenames.map((filename) => {
                        return {
                            instructions: filename,
                            addedById: verifiedUser.user.id,
                            setId: newSet.id,
                            attachmentId: newAttachment.id
                        }
                    })

                })

                if (newSet && newAttachment && newInstructions) {
                    res.status(201).send({ message: "set added" })

                } else {
                    res.status(503).send({ message: "set could not be added" })
                }
            }
            catch (err) {
                console.log(err)
                return res.status(500).send({ message: "set could not be saved" })
            }
        }
        else {
            try {
                let newSet = await prisma.sets.update({
                    where: { id: set.id },
                    data: {
                        usedBy: { connect: { id: verifiedUser.user.id } },
                    }
                })

                let newAttachment = await prisma.setAttachment.create({
                    data: {
                        description: userSet?.description || null,
                        yearBought: parseInt(userSet?.yearBought) || null,
                        price: parseInt(userSet?.price) || null,
                        image: newImageFilename || null,
                        addedBy: { connect: { id: verifiedUser.user.id } },
                        set: { connect: { id: set.id } }
                    }
                })
                if (newPDFFilenames.length > 0) {
                    let newInstructions = await prisma.instructions.createMany({
                        data: newPDFFilenames.map((filename) => {
                            return {
                                instructions: filename,
                                addedById: verifiedUser.user.id,
                                setId: set.id,
                                attachmentId: newAttachment.id
                            }
                        })
                    })
                }


                if (newSet && newAttachment) {
                    res.status(201).send({ message: "set added" })

                } else {
                    res.status(503).send({ message: "set could not be added" })
                }

            }
            catch (err) {
                console.log(err)
                return res.status(500).send({ message: "set could not be saved" })
            }
        }
    } catch (e) {
        console.log(e)
        res.status(503).send({ message: "set could not be added" })
    }
}



export default { post }