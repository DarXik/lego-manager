import express from "express"
import controller from "../../../../controllers/Set/SetsDeleteController"

const router = express.Router()

router.delete("/:id", controller.deleteSet)


export default router