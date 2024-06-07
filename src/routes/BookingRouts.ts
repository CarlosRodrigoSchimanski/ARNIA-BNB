import { Router } from "express"
import { storageMiddlleware } from "../middlewares/storege"
import { tokenValidateMiddlleware } from "../middlewares/validateToken"
import { createBooking, returnFree, updateStatus } from "../controllers/bookingController"

const router = Router()

router.post("/create", storageMiddlleware.single("photo"),tokenValidateMiddlleware,createBooking)
router.post("/update",tokenValidateMiddlleware,updateStatus)
router.get("/free",returnFree)


export default router