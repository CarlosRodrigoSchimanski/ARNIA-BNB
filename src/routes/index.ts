import { Router } from "express"
import UserRouts from "./UserRouts"
import BossRouts from "./BossRouts"


const router = Router()

router.use("/user", UserRouts)
router.use("/boss", BossRouts)

export default router