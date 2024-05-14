import { Request, Response } from "express"
import express from "express"
import controller from "../../../controllers/User/RegisterController"

const router = express.Router()

router.post("/", controller.post)

export default router