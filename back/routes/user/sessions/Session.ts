import express from "express"
import controller from "../../../controllers/User/SessionsController"

const router = express.Router()

router.get("/", controller.get)

export default router