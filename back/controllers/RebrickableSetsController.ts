import { Request, Response } from "express"

const post = async (req: Request, res: Response) => {
    console.log(req.body);



}

export default { post }