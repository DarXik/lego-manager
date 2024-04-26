import express from "express"
import controller from "../../../../controllers/InstructionsController"

const router = express.Router()

router.get("/:filename", controller.get)

export default router

