import express from "express"
import controller from "../../../../controllers/Set/SetsEditController"

const router = express.Router()

router.patch("/", controller.patch)
router.delete ("/", controller.deleteMedia)


export default router