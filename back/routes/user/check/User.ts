import express from "express"
import controller from "../../../controllers/User/UserCheckController"

const router = express.Router()

router.get("/", controller.get)

export default router