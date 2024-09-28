import { Request, Response } from "express"
import path from "path"
import fs from 'fs'
import dotenv from "dotenv"
dotenv.config()
const MEDIA_PATH = process.env.MEDIA_PATH || "../../uploads/images"

const get = async (req: Request, res: Response) => {
    if (!req.params.filename) {
        return res.status(400).send({ message: "something is missing" })
    }

    const filename = req.params.filename

    try {
        const filePath = path.join(__dirname, `${MEDIA_PATH}/instructions/${filename}`)

        if (!fs.existsSync(filePath)) {
            return res.status(404).send({ message: "pdf not found 1" })
        }

        console.log("download: ", filePath)
        res.download(filePath)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "pdf not found 2" })
    }
}

export default { get }