import { Router } from "express"
import { storageMiddlleware } from "../middlewares/storege"
import { tokenValidateMiddleware } from "../middlewares/validateToken"
import { createBedroom, returnFree, returnFreeByDate, updateStatus } from "../controllers/BedroomController"


const router = Router()

router.post("/create",tokenValidateMiddleware,storageMiddlleware.single("photo"),createBedroom)
router.post("/update",tokenValidateMiddleware,updateStatus)
router.get("/free", returnFree)
router.post("/freeDate", returnFreeByDate)


export default router