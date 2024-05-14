import express from "express"
import controller from "../../../../controllers/Set/SetsAddController"

const router = express.Router()

router.post("/", controller.post)


export default router

