import express from "express"
import { googleAuth, userDetails } from "../controlers/authController.js"
import authMiddleware from "../middleware/authMiddle.js"

const authRouter = express.Router()
authRouter.post("/", googleAuth)
authRouter.get("/me", authMiddleware, userDetails)

export default authRouter