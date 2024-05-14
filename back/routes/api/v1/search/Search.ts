import express from "express"
import controller from "../../../../controllers/Set/SetsSearchController"

const router = express.Router()

router.get("/:query", controller.get)

export default router