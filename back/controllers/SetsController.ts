import { Request, Response } from "express"

const get = (req: Request, res: Response) => {
    res.send("sets")
}

export default { get }