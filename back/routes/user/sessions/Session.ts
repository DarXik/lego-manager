import express from "express"
import controller from "../../../controllers/User/SessionsController"

const router = express.Router()

router.get("/", controller.get)
router.delete("/:sessionId", controller.deleteSession)

export default router