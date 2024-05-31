import express from "express"
import controller from "../../../controllers/User/UserPreferencesController"

const router = express.Router()

router.get("/", controller.get)

export default router