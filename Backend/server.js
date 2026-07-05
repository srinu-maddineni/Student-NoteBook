import express from "express"

import cors from "cors"
import conectDb from "./config/mongodb.js"




const app = express()
app.use(express.json())

conectDb()



app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"]
        if (allowedOrigins.includes(origin)) {
            callback(null, true)
        }
        else {
            callback(null, false)
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/auth", authRoutes)





app.listen(5000, () => {
    console.log("Server is running on port 5000")
})


