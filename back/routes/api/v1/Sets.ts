import { Request, Response } from "express"
import express from "express"
import controller from "../../../controllers/SetsController"

const router = express.Router()

router.get("/", controller.get)

router.post("/", async (req: Request, res: Response) => {
    res.send("sets new")
})

export default router