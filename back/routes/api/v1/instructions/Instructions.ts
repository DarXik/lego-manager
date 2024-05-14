import express from "express"
import controller from "../../../../controllers/Media/InstructionsController"
import controller1 from "../../../../controllers/Media/InstructionsDownloadController"

const router = express.Router()

router.get("/:filename", controller.get)
router.get("/download/:filename", controller1.get)

export default router

