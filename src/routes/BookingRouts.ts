import { Router } from "express"
import { storageMiddlleware } from "../middlewares/storege"
import { tokenValidateMiddlleware } from "../middlewares/validateToken"
import { createBooking, updateStatus } from "../controllers/bookingController"

const router = Router()

router.post("/create", storageMiddlleware.single("photo"),tokenValidateMiddlleware,createBooking)
router.post("/update",tokenValidateMiddlleware,updateStatus)


export default router