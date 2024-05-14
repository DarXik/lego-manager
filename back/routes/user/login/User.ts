import express from "express"
import controller from "../../../controllers/User/LoginController"

const router = express.Router()

router.post("/", controller.post)

export default router