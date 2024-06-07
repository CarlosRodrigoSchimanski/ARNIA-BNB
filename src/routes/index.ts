import { Router } from "express"
import UserRouts from "./UserRouts"
import BossRouts from "./BossRouts"
import BookingRouts from "./BookingRouts"


const router = Router()

router.use("/user", UserRouts)
router.use("/boss", BossRouts)
router.use("/booking", BookingRouts)

export default router