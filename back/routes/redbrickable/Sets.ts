import express from "express"
import controller from "../../controllers/RebrickableSetsController"

const router = express.Router()

router.post("/", controller.post)

export default router