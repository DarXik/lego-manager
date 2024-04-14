import express from "express"
import controller from "../../../controllers/UserCheckController"

const router = express.Router()

router.post("/", controller.post)

export default router