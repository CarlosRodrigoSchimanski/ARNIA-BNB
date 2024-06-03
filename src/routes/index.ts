import { Router } from "express"
import UserRouts from "./UserRouts"


const router = Router()

router.use("/user", UserRouts)

export default router