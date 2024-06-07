import { Router } from "express"
import { createReserva } from "../controllers/roonController"
import { tokenValidateMiddlleware } from "../middlewares/validateToken"


const router = Router()

router.post("/new",tokenValidateMiddlleware,createReserva)


export default router