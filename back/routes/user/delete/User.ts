import express from "express"
import controller from "../../../controllers/User/DeleteController"

const router = express.Router()

router.delete("/", controller.deleteAccount)

export default router