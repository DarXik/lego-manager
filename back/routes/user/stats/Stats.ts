import express from "express"
import controller from "../../../controllers/User/StatsController";

const router = express.Router()

router.get("/", controller.get)

export default router