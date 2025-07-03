import express from "express"
import { GoogleAuthController, LoginController, SignupController } from "../controllers/authController"

const router = express.Router()

router.post('/signup', SignupController)
router.post('/login', LoginController)
router.post('/google', GoogleAuthController)



export default router