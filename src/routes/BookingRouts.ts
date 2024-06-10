import { Router } from "express"
import { createReservation } from "../controllers/BookingController"
import { tokenValidateMiddleware } from "../middlewares/validateToken"

const router = Router()

router.post("/create",tokenValidateMiddleware,createReservation)



export default router