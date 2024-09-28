import { Request, Response } from "express"
import { verifyUser } from "../../services/userAuthentication";
import prisma from "../../config/prisma";
import uniqid from "uniqid";
import multer from "multer";
const upload = multer({ dest: "uploads/" })
import path from "path"
import fs from 'fs'
import dotenv from "dotenv"
dotenv.config()
const MEDIA_PATH = process.env.MEDIA_PATH || "../../uploads/images"

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

            const allowedExtensions = ['.jpg', '.jpeg', '.png', , '.webp', '.JPG', '.JPEG', '.PNG', , '.WEBP', '.pdf', '.PDF']

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
                        console.log(filename)
                        const filePath = path.join(__dirname, `${MEDIA_PATH}/instructions/${filename}`) // přidat ../ -> env
                        console.log(filePath)
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

                        const filePath = path.join(__dirname, `${MEDIA_PATH}/images/${newImageFilename}`)

                        console.log(newImageFilename)
                        console.log(filePath)
                        await fs.promises.writeFile(filePath, files[key].buffer)
                    }
                    catch (err) {
                        console.log(err)
                        return res.status(500).send({ message: "image could not be saved" })
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "media could not be saved" })
        }
    }

    try {

        // uložení a vytvoření setu
        let set: any = await prisma.sets.findUnique({ where: { setNumber: userSet.setNumber } })
        try {
            if ((await prisma.sets.findMany({ where: { usedBy: { some: { id: verifiedUser.user.id } } } })).find((s) => s.setNumber == userSet.setNumber)) {
                console.log("set already added");
                return res.status(400).send({ message: "set already added" })
            }
        }
        catch (err) {
            console.log(err)
            return res.status(500).send({ message: "set could not be saved" })
        }

        if (!set) {

            try {
                let newSet = await prisma.sets.create({
                    data: {
                        setNumber: userSet.setNumber,
                        name: userSet.name,
                        yearReleased: parseInt(userSet.yearReleased),
                        partsAmount: parseInt(userSet.partsAmount),
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
                        set: { connect: { id: newSet.id } },
                        currency: verifiedUser.user.preferredCurrency
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
                        set: { connect: { id: set.id } },
                        currency: verifiedUser.user.preferredCurrency
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