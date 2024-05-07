import express from "express"
import controller from "../../../controllers/UpdateController"

const router = express.Router()

router.patch("/", controller.patch)

export default router