import { Router } from "express"
import { createBoss, loginBoss } from "../controllers/BossControler"


const router = Router()

router.post("/create", createBoss)
router.post("/login", loginBoss)


export default router