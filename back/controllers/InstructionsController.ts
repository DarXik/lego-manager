import { Request, Response } from "express"
import { verifyUser } from "../services/userAuthentication";
import path from "path"
import fs from 'fs'

const get = async (req: Request, res: Response) => {
    if (!req.params.filename) {
        return res.status(400).send({ message: "something is missing" })
    }

    const filename = req.params.filename
    console.log(filename)

    try {
        const filePath = path.join(__dirname, `../../uploads/instructions/${filename}`)

        if (!fs.existsSync(filePath)) {
            return res.status(404).send({ message: "pdf not found" })
        }
        
        res.status(200).sendFile(filePath)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "pdf not found" })
    }
}

export default { get }