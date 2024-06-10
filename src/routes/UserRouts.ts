import { Router } from "express"
import { createUser, deleteBooking, listUserBookings, loginUser } from "../controllers/UserControler"
import { tokenValidateMiddleware } from "../middlewares/validateToken"

const router = Router()

router.post("/create", createUser)
router.post("/login",loginUser)
router.post("/myBookings", tokenValidateMiddleware,listUserBookings)
router.post("/deleteBooking",tokenValidateMiddleware,deleteBooking)


export default router