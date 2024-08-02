import express from "express"
import { verifyToken } from "../middlewares/verifyUser"
import { updateProfile } from "../controllers/userController"

const router = express.Router()

router.post('/update', verifyToken , updateProfile)

export default router