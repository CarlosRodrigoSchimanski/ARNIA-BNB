import { Router } from "express"
import { storageMiddlleware } from "../middlewares/storege"
import { tokenValidateMiddlleware } from "../middlewares/validateToken"
import { createBooking } from "../controllers/bookingController"

const router = Router()

router.post("/create", storageMiddlleware.single("photo"),tokenValidateMiddlleware,createBooking)


export default router