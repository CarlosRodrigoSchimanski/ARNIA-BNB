import { Router } from "express"
import UserRouts from "./UserRouts"
import BossRouts from "./BossRouts"
import BookingRouts from "./BookingRouts"
import RoonRouts from "./roonRouts"


const router = Router()

router.use("/user", UserRouts)
router.use("/boss", BossRouts)
router.use("/booking", BookingRouts)
router.use("/reservas",RoonRouts)

export default router