import { Request, Response } from "express"
import express from "express"
import controller from "../../../controllers/SetsController"

const router = express.Router()

router.get("/", controller.get)
router.get("/:id", controller.get)

export default router