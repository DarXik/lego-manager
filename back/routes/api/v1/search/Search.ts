import express from "express"
import controller from "../../../../controllers/SetsSearchController"

const router = express.Router()

router.post("/", controller.post)

export default router