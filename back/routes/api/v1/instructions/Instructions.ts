import express from "express"
import controller from "../../../../controllers/InstructionsController"
import controller1 from "../../../../controllers/InstructionsDownloadController"

const router = express.Router()

router.get("/:filename", controller.get)
router.get("/download/:filename", controller1.get)

export default router

