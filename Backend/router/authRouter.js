import express from "express"
import { googleAuth } from "../controlers/authController.js"

const authRouter = express.Router()
authRouter.post("/", googleAuth)

export default authRouter