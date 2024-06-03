import { Router } from "express"
import { createUser } from "../controllers/UserControler"

const router = Router()

router.post("/", createUser)

export default router