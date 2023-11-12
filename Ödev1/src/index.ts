import express from "express"
import userRouter from "./router/user.router"
import tweetRouter from "./router/tweet.router"


const app = express()
app.use(express.json())
app.use("/user",userRouter)
app.use("/tweet",tweetRouter)

export default app