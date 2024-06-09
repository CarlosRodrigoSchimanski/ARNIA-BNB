import { Router } from "express"
import UserRouts from "./UserRouts"
import BossRouts from "./BossRouts"
import BookingRouts from "./BookingRouts"
import BedRoomRouts from "./BedRoomRouts"



const router = Router()

router.use("/user", UserRouts)
router.use("/boss", BossRouts)
router.use("/booking", BookingRouts)
router.use("/bedroom", BedRoomRouts)

export default router